import React from 'react'
import { getAllPosts, getPostBySlug, Items } from '../lib/api'

function IndividualPost({ post }: { post: Items}) {
  const { title = '', date = '', content = '' } = post
  return (
    <div>
      <h1>{title}</h1>
      <div>date: {date}</div>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default IndividualPost

export const getStaticProps = async ({ params }: { params: { slug: string }}) => {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'content'
  ])

  return {
    props: {
      post
    }
  }
}

export const getStaticPaths = async () => {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map(post => {
      return {
        params: {
          slug: post.slug
        }
      }
    }),
    fallback: false
  }
}