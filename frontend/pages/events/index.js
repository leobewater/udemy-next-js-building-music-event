import Layout from '@/components/Layout'
import EventItem from '@/components/EventItem'
import { API_URL, PER_PAGE } from '@/config/index'
import Pagination from '@/components/Pagination'

export default function EventsPage({ events, page, total }) {
  return (
    <Layout>
      <h1>Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}

      {events.map((evt) => (
        <EventItem key={evt.id} evt={evt} />
      ))}

      <Pagination page={page} total={total} />
    </Layout>
  )
}

// getStaticProps - fetch at build time
// export async function getStaticProps() {
//   const res = await fetch(`${API_URL}/api/events?populate=*&_sort=date:ASC`)
//   const { data } = await res.json()

//   return {
//     props: {
//       events: data.slice(0, 3),
//     },
//     // re-validate on every seconds
//     revalidate: 1,
//   }
// }

// using server side props and set page = 1 by default
export async function getServerSideProps({ query: { page = 1 } }) {
  // calculate start page
  page = parseInt(page, 10)
  const start = page === 1 ? 0 : (page - 1) * PER_PAGE

  // fetch events with pagination
  const res = await fetch(
    `${API_URL}/api/events?populate=*&_sort=date:ASC&pagination[limit]=${PER_PAGE}&pagination[start]=${start}`
  )
  const events = await res.json()

  // console.log(events)

  return {
    props: {
      events: events.data,
      page: page,
      total: events.meta.pagination.total,
    },
  }
}
