import { loadStripe, Stripe } from '@stripe/stripe-js'

export class StripeJsService {
  async getStripeJs(): Promise<Stripe | null> {
    return loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY)
  }
}
