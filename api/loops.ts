import type { VercelRequest, VercelResponse } from '@vercel/node'

const LOOPS_API_KEY = '157bcc7c12d5ab5bb7cab1eacea5faef'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, firstName, lastName } = req.body

  const response = await fetch('https://app.loops.so/api/v1/contacts/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${LOOPS_API_KEY}`,
    },
    body: JSON.stringify({
      email,
      firstName,
      lastName,
      source: 'eden_waitlist',
      userGroup: 'waitlist',
    }),
  })

  const data = await response.json()
  return res.status(response.status).json(data)
}
