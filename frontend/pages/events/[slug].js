import Link from 'next/link'
import Image from 'next/image'
import { FaPencilAlt, FaTimes } from 'react-icons/fa'
import Layout from '@/components/Layout'
import { API_URL } from '@/config/index'
import styles from '@/styles/Event.module.css'

export default function EventPage({ evt }) {
  const deleteEvent = (e) => {
    e.preventDefault()
    console.log(e)
  }
  return (
    <Layout title="Event Page">
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${evt.id}`}>
            <a>
              <FaPencilAlt /> Edit Event
            </a>
          </Link>

          <a href="#" className={styles.delete} onClick={deleteEvent}>
            <FaTimes />
          </a>
        </div>

        <span>
          {evt.date} at {evt.time}
        </span>
        <h1>{evt.name}</h1>

        {evt.image && (
          <div className={styles.image}>
            <Image src={`${evt.image}`} width={960} height={600} />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.performers}</p>

        <h3>Description</h3>
        <p>{evt.description}</p>

        <h3>Venue: {evt.venue}</h3>
        <p>{evt.address}</p>

        <Link href="/events">
          <a className={styles.back}>{`< Go back`}</a>
        </Link>
      </div>
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
    fallback: true,
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
    revalidate: 1,
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
