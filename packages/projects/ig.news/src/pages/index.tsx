import { GetStaticProps } from 'next'
import Head from 'next/head'

import { StripeService } from '../services/stripe.service'
import styles from '../styles/pages/home.module.scss'
import { SubscribeButton } from '../components/subscribe-button'

type HomeProps = {
  product: {
    priceId: string
    amount: string
  }
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const stripe = new StripeService()
  const price = await stripe.getSubscriptionPricingData()
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount! / 100),
  }

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.main}>
        <section className={styles.hero}>
          <p className={styles.greetings}>
            <span role='img' aria-label='clapping hands'>
              👏
            </span>{' '}
            Hey, welcome!
          </p>

          <h1 className={styles.title}>
            News about the <span>React</span> world.
          </h1>

          <p className={styles['pricing-text']}>
            Get access to all the publications <br />
            <span>for {product.amount} per month</span>
          </p>

          <SubscribeButton
            priceId={product.priceId}
            className={styles['subscribe-button']}
          />
        </section>

        <img
          src='/images/avatar.svg'
          alt='girl working on a laptop with a React logo sticker on the cover.'
        />
      </main>
    </>
  )
}
