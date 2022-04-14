import cookie from 'cookie'
import { API_URL } from '@/config/index'

// work as a middleman before sending request to strapi
const checkUserLoggedIn = async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      res.status(403).json({ message: 'Not Authorized' })
      return
    }

    // parse the cookie and get the token
    const { token } = cookie.parse(req.headers.cookie)

    const strapiRes = await fetch(`${API_URL}/api/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    const user = await strapiRes.json()

    if (strapiRes.ok) {
      res.status(200).json({ user })
    } else {
      res.status(403).json({ message: 'User Forbidden' })
    }
  } else {
    res.setHeader('Allow', ['GET'])
    res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  }
}

export default checkUserLoggedIn
