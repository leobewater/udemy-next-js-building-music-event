import qs from 'qs'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL } from '@/config/index'

export default function SearchPage({ events }) {
  const router = useRouter()

  return (
    <Layout title="Search Results">
      <Link href="/events">{`< Go Back`}</Link>
      <h1>Search Results for "{router.query.term}"</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      {events.length > 0 && (
        <Link href="/events">
          <a className="btn-secondary">View All Events</a>
        </Link>
      )}
    </Layout>
  )
}

// use server side props
export async function getServerSideProps({ query: { term } }) {
  const query = qs.stringify(
    {
      filters: {
        $or: [
          { name: { $containsi: term } },
          { performers: { $containsi: term } },
          { description: { $containsi: term } },
          { venue: { $containsi: term } },
        ],
      },
    },
    {
      encode: false,
    }
  )

  const res = await fetch(`${API_URL}/api/events?${query}&populate=*`)
  const { data } = await res.json()

  return {
    props: {
      events: data,
    },
  }
}
