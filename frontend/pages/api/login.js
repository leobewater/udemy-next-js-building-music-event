import cookie from 'cookie'
import { API_URL } from '@/config/index'

// work as a middleman before sending request to strapi
const login = async (req, res) => {
  if (req.method === 'POST') {
    const { identifier, password } = req.body

    const strapiRes = await fetch(`${API_URL}/api/auth/local`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    })

    const data = await strapiRes.json()
    if (strapiRes.ok) {
      // set cookie
      res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', data.jwt, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 60 * 60 * 24 * 7, // 1 week
          sameSite: 'strict',
          path: '/'
        })
      )

      res.status(200).json({ user: data.user })
    } else {
      // failed
      res.status(data.error.status).json({ message: data.error.message })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
}

export default login
