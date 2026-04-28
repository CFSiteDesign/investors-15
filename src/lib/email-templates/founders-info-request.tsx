import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'
import type { TemplateEntry } from './registry'

interface FoundersInfoRequestProps {
  name?: string
  email?: string
}

function FoundersInfoRequestEmail({ name = 'Unknown', email = 'Unknown' }: FoundersInfoRequestProps) {
  return (
    <Html lang="en" dir="ltr">
      <Head />
      <Preview>{`name:${name} email:${email} has requested info`}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>New investor info request</Heading>
          <Text style={message}>{`name:${name} email:${email} has requested info`}</Text>
        </Container>
      </Body>
    </Html>
  )
}

export const template = {
  component: FoundersInfoRequestEmail,
  subject: 'New Mad Monkey investor info request',
  displayName: 'Founders info request',
  previewData: { name: 'Charlie', email: 'charlie@example.com' },
  to: 'founders@madmonkeyhostels.com',
} satisfies TemplateEntry

const main = {
  backgroundColor: '#ffffff',
  fontFamily: 'Arial, Helvetica, sans-serif',
}

const container = {
  border: '1px solid #111111',
  margin: '32px auto',
  maxWidth: '560px',
  padding: '32px',
}

const heading = {
  color: '#111111',
  fontFamily: 'Arial Black, Arial, Helvetica, sans-serif',
  fontSize: '24px',
  fontWeight: '900',
  lineHeight: '1.1',
  margin: '0 0 24px',
  textTransform: 'uppercase' as const,
}

const message = {
  color: '#333333',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0',
}
