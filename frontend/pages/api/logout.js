import cookie from 'cookie'
import { API_URL } from '@/config/index'

// work as a middleman before sending request to strapi
const logout = async (req, res) => {
  if (req.method === 'POST') {
    // destroy cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    )

    res.status(200).json({ message: 'Success' })
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
}

export default logout
