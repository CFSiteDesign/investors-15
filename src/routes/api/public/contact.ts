import * as React from 'react'
import { render } from '@react-email/render'
import { createClient } from '@supabase/supabase-js'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'

import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'investors-15'
const SENDER_DOMAIN = 'notify.theorox.com'
const FROM_DOMAIN = 'notify.theorox.com'
const TEMPLATE_NAME = 'founders-info-request'
const FOUNDERS_EMAIL = 'founders@madmonkeyhostels.com'

const contactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
})

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

export const Route = createFileRoute('/api/public/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }

        let parsed: z.infer<typeof contactSchema>
        try {
          parsed = contactSchema.parse(await request.json())
        } catch {
          return Response.json({ error: 'Invalid contact details' }, { status: 400 })
        }

        const supabase = createClient(supabaseUrl, supabaseServiceKey) as any
        const template = TEMPLATES[TEMPLATE_NAME]

        if (!template) {
          return Response.json({ error: 'Email template unavailable' }, { status: 500 })
        }

        const normalizedRecipient = FOUNDERS_EMAIL.toLowerCase()
        const { data: suppressed, error: suppressionError } = await supabase
          .from('suppressed_emails')
          .select('id')
          .eq('email', normalizedRecipient)
          .maybeSingle()

        if (suppressionError) {
          return Response.json({ error: 'Could not verify email status' }, { status: 500 })
        }

        const messageId = crypto.randomUUID()

        if (suppressed) {
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: FOUNDERS_EMAIL,
            status: 'suppressed',
          })
          return Response.json({ error: 'Email recipient unavailable' }, { status: 409 })
        }

        const { data: existingToken } = await supabase
          .from('email_unsubscribe_tokens')
          .select('token, used_at')
          .eq('email', normalizedRecipient)
          .maybeSingle()

        let unsubscribeToken = existingToken?.used_at ? generateToken() : existingToken?.token
        if (!unsubscribeToken) {
          unsubscribeToken = generateToken()
          await supabase.from('email_unsubscribe_tokens').upsert(
            { token: unsubscribeToken, email: normalizedRecipient },
            { onConflict: 'email' },
          )
        }

        const templateData = { name: parsed.name, email: parsed.email }
        const element = React.createElement(template.component, templateData)
        const html = await render(element)
        const text = await render(element, { plainText: true })
        const subject = typeof template.subject === 'function' ? template.subject(templateData) : template.subject

        await supabase.from('email_send_log').insert({
          message_id: messageId,
          template_name: TEMPLATE_NAME,
          recipient_email: FOUNDERS_EMAIL,
          status: 'pending',
        })

        const { error: enqueueError } = await supabase.rpc('enqueue_email', {
          queue_name: 'transactional_emails',
          payload: {
            message_id: messageId,
            to: FOUNDERS_EMAIL,
            from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
            sender_domain: SENDER_DOMAIN,
            subject,
            html,
            text,
            purpose: 'transactional',
            label: TEMPLATE_NAME,
            idempotency_key: `founders-info-${messageId}`,
            unsubscribe_token: unsubscribeToken,
            queued_at: new Date().toISOString(),
          },
        })

        if (enqueueError) {
          await supabase.from('email_send_log').insert({
            message_id: messageId,
            template_name: TEMPLATE_NAME,
            recipient_email: FOUNDERS_EMAIL,
            status: 'failed',
            error_message: 'Failed to enqueue email',
          })
          return Response.json({ error: 'Failed to send request' }, { status: 500 })
        }

        return Response.json({ success: true })
      },
    },
  },
})
