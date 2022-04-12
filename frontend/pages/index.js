import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function HomePage({ events }) {
  // console.log(events)
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}
    </Layout>
  )
}

// getStaticProps - fetch at build time
export async function getStaticProps() {
  const res = await fetch(
    `${API_URL}/api/events?[populate]=*&_sort=date:ASC&_limit=3`
  )
  const { data } = await res.json()

  // log on server side
  // console.log(events)

  return {
    props: {
      events: data,
    },
    // re-validate on every seconds
    revalidate: 1,
  }
}
