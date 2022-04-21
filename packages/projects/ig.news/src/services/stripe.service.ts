import Stripe from 'stripe'
import packageJson from '../../package.json'

export class StripeService {
  readonly api: Stripe
  private readonly subscriptionPricingApiId: string

  constructor() {
    this.api = new Stripe(process.env.STRIPE_API_KEY, {
      apiVersion: '2020-08-27',
      appInfo: { name: 'ig.news', version: packageJson.version },
    })
    this.subscriptionPricingApiId = 'price_1JwqrvLOVN2rNh1lSaE2nv2d'
  }

  async getSubscriptionPricingData() {
    return this.api.prices.retrieve(this.subscriptionPricingApiId)
  }

  async createCheckoutSession(customerId: string) {
    return this.api.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      line_items: [{ price: this.subscriptionPricingApiId, quantity: 1 }],
      mode: 'subscription',
      allow_promotion_codes: true,
      success_url: process.env.STRIPE_SUCCESS_URL,
      cancel_url: process.env.STRIPE_CANCEL_URL,
    })
  }

  async createCustomer(email: string) {
    return this.api.customers.create({ email })
  }

  constructWebhookEvent(buffer: Buffer, signature: string) {
    return this.api.webhooks.constructEvent(
      buffer,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    )
  }

  async retrieveSubscription(subscriptionId: string) {
    return this.api.subscriptions.retrieve(subscriptionId)
  }
}
