import type { AppProps } from 'next/app'
import Head from 'next/head'
import { Provider as NextAuthProvider } from 'next-auth/client'

import '../styles/main.scss'
import { Header } from '../components/header'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>ig.news</title>
      </Head>
      <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
      </NextAuthProvider>
    </>
  )
}

export default MyApp
