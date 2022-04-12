import Link from 'next/link'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'

export default function EventPage({ evt }) {
  return (
    <Layout title="Event Page">
      <h1>{evt.name}</h1>
    </Layout>
  )
}

// generate all events slugs and paths for getStaticProps
export async function getStaticPaths() {
  // get all events
  const res = await fetch(`${API_URL}/api/events`)
  const events = await res.json()

  const paths = events.map((evt) => ({ params: { slug: evt.slug } }))

  return {
    paths,
    fallback: true
  }
}

// get events at build time must required getStaticPaths
export async function getStaticProps({ params: { slug } }) {
  // console.log(slug)
  const res = await fetch(`${API_URL}/api/events/${slug}`)
  const events = await res.json()

  return {
    props: {
      evt: events[0],
    },
    revalidate: 1
  }
}

// export async function getServerSideProps({ query: { slug } }) {
//   // console.log(slug)
//   const res = await fetch(`${API_URL}/api/events/${slug}`)
//   const events = await res.json()

//   return {
//     props: {
//       evt: events[0],
//     },
//   }
// }
