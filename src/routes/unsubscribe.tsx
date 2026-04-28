import { useEffect, useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/unsubscribe')({
  component: UnsubscribePage,
})

function UnsubscribePage() {
  const [status, setStatus] = useState<'checking' | 'valid' | 'used' | 'invalid' | 'done' | 'error'>('checking')
  const [token, setToken] = useState('')

  useEffect(() => {
    const currentToken = new URLSearchParams(window.location.search).get('token') ?? ''
    setToken(currentToken)

    if (!currentToken) {
      setStatus('invalid')
      return
    }

    fetch(`/email/unsubscribe?token=${encodeURIComponent(currentToken)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Invalid token')
        return response.json()
      })
      .then((data) => setStatus(data.valid ? 'valid' : 'used'))
      .catch(() => setStatus('invalid'))
  }, [])

  const confirmUnsubscribe = async () => {
    setStatus('checking')
    try {
      const response = await fetch('/email/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      })

      if (!response.ok) throw new Error('Unsubscribe failed')
      const data = await response.json()
      setStatus(data.success ? 'done' : 'used')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-5 text-foreground">
      <section className="w-full max-w-[560px] border border-border p-8">
        <p className="text-[12px] font-black uppercase tracking-[0.18em] text-muted-foreground">Email preferences</p>
        <h1 className="mt-5 font-display text-[clamp(34px,6vw,64px)] uppercase leading-none tracking-normal">Unsubscribe</h1>
        {status === 'checking' ? <p className="mt-6 text-muted-foreground">Checking your unsubscribe link.</p> : null}
        {status === 'valid' ? (
          <>
            <p className="mt-6 text-muted-foreground">Confirm you no longer want to receive these emails.</p>
            <button onClick={confirmUnsubscribe} className="mt-8 bg-foreground px-6 py-4 text-[12px] font-black uppercase tracking-[0.16em] text-background">Confirm Unsubscribe</button>
          </>
        ) : null}
        {status === 'done' ? <p className="mt-6 text-muted-foreground">You have been unsubscribed.</p> : null}
        {status === 'used' ? <p className="mt-6 text-muted-foreground">This email address is already unsubscribed.</p> : null}
        {status === 'invalid' ? <p className="mt-6 text-muted-foreground">This unsubscribe link is invalid or expired.</p> : null}
        {status === 'error' ? <p className="mt-6 text-destructive">Something went wrong. Please try again.</p> : null}
      </section>
    </main>
  )
}
