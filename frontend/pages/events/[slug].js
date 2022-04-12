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
          {evt.attributes.date} at {evt.attributes.time}
        </span>
        <h1>{evt.name}</h1>

        {evt.attributes.image && (
          <div className={styles.image}>
            <Image
              src={
                evt.attributes.image
                  ? evt.attributes.image.data.attributes.formats.large.url
                  : '/images/event-default.png'
              }
              width={960}
              height={600}
              alt={evt.attributes.name}
            />
          </div>
        )}

        <h3>Performers:</h3>
        <p>{evt.attributes.performers}</p>

        <h3>Description</h3>
        <p>{evt.attributes.description}</p>

        <h3>Venue: {evt.attributes.venue}</h3>
        <p>{evt.attributes.address}</p>

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
  const { data } = await res.json()

  const paths = data.map((evt) => ({ params: { slug: evt.attributes.slug } }))

  return {
    paths,
    fallback: true,
  }
}

// get events at build time must required getStaticPaths
export async function getStaticProps({ params: { slug } }) {
  // console.log(slug)
  const res = await fetch(
    `${API_URL}/api/events?filters[slug][$eq]=${slug}&populate=*`
  )
  const { data } = await res.json()

  return {
    props: {
      evt: data[0],
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
