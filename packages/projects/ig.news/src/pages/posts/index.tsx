import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import { RTParagraphNode } from '@prismicio/types'
import styles from '../../styles/pages/posts.module.scss'
import { PrismicService } from '../../services/prismic.service'

type PostItem = {
  slug: string
  title: string
  createdAt: string
  excerpt: string
}

export type PostsPageProps = {
  posts: PostItem[]
}

export const getStaticProps: GetStaticProps<PostsPageProps> = async () => {
  const prismicService = new PrismicService()

  const response = await prismicService.getAllPosts()
  const posts: PostItem[] = response.data!.allPosts.edges.map(({ node }) => ({
    slug: node._meta.uid,
    title: node.title,
    createdAt: new Date(node._meta.firstPublicationDate).toLocaleDateString(
      'pt-BR',
      { day: '2-digit', month: 'long', year: 'numeric' },
    ),
    excerpt: (() => {
      const paragraphsWithText = node.content.filter(
        (content) => content.type === 'paragraph' && !!content.text.length,
      )
      if (!paragraphsWithText.length) return ''
      const firstParagraph = paragraphsWithText[0] as RTParagraphNode
      return firstParagraph.text
    })(),
  }))

  return {
    props: {
      posts,
    },
  }
}

export default function PostsPage({ posts }: PostsPageProps) {
  return (
    <>
      <Head>
        <title>Posts | ig.news</title>
      </Head>

      <main className={styles.main}>
        <div className={styles.wrapper}>
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`}>
              <a className={styles.post_link}>
                <time className={styles.post_date}>{post.createdAt}</time>
                <strong className={styles.post_title}>{post.title}</strong>
                <p className={styles.post_content}>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  )
}
