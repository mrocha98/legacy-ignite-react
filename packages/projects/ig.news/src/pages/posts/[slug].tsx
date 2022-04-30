import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import c from 'classnames'
import { RTParagraphNode } from '@prismicio/types'
import styles from '../../styles/pages/post.module.scss'
import { PrismicService } from '../../services/prismic.service'

export type PostPageProps = {}

export const getStaticProps: GetStaticProps<PostPageProps> = async () => {
  const prismicService = new PrismicService()

  return {
    props: {},
  }
}

export default function PostPage({}: PostPageProps) {
  return (
    <>
      <Head>
        <title>sua mãe trabalha com roupa?</title>
      </Head>

      <main />
    </>
  )
}
