import { parseCookie } from '@/helpers/index'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Dashboard.module.css'
import DashboardEvent from '@/components/DashboardEvent'

export default function Dashboard({ events }) {
  const deleteEvent = (id) => {
    console.log(id)
  }

  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>My Events</h3>

        {events.map((evt) => (
          <DashboardEvent key={evt.id} evt={evt} handleDelete={deleteEvent} />
        ))}
      </div>
    </Layout>
  )
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
