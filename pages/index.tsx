import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { getAllPosts, Items } from '../lib/api'
import styles from '../styles/Home.module.css'

const Home = ({allPosts}: {allPosts: Array<Items>}) => {
  const { push } = useRouter()
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next Blog</title>
        <meta name="description" content="Static page for blog" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {allPosts.map(post => (
          <div className={styles.post} key={post.title} onClick={() => push(post.slug)}>{post.title}</div>
        ))}
      </main>
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
  ])
  return {
    props: { allPosts }
  }
}