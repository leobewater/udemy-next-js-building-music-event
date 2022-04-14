import { parseCookie } from '@/helpers/index'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function Dashboard({events}) {
  return <Layout title="User Dashboard">Dashboard</Layout>
}

// when load, server side get my events from strapi
export async function getServerSideProps({ req }) {
  const { token } = parseCookie(req)
  // console.log(token)

  const res = await fetch(`${API_URL}/api/events/me`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  const events = await res.json()

  return {
    props: {
      events,
    },
  }
}
