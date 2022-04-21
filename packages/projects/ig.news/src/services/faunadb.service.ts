import { Client, query as q, Ref } from 'faunadb'
import type { Stripe } from 'stripe'

export class FaunaDBService {
  readonly client: Client

  constructor() {
    this.client = new Client({
      secret: process.env.FAUNADB_KEY,
      domain: 'db.us.fauna.com',
    })
  }

  async findUserByEmail(email: string) {
    return this.client.query<User>(
      q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email))),
    )
  }

  async createUserIfNotExists(email: string) {
    return this.client.query(
      q.If(
        q.Not(q.Exists(q.Match(q.Index('user_by_email'), q.Casefold(email)))),
        q.Create(q.Collection('users'), { data: { email } }),
        q.Get(q.Match(q.Index('user_by_email'), q.Casefold(email))),
      ),
    )
  }

  async updateUser(user: User, stripeCustomer: Stripe.Customer) {
    return this.client.query(
      q.Update(q.Ref(q.Collection('users'), user.ref.id), {
        data: {
          stripe_customer_id: stripeCustomer.id,
        },
      }),
    )
  }

  async getUserRef(customerId: string) {
    return this.client.query(
      q.Select(
        'ref',
        q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId)),
      ),
    )
  }

  async saveSubscription(subscription: Subscription) {
    return this.client.query(
      q.Create(q.Collection('subscriptions'), { data: subscription }),
    )
  }

  async updateSubscription(id: string, subscription: Subscription) {
    return this.client.query(
      q.Replace(
        q.Select('ref', q.Get(q.Match(q.Index('subscription_by_id'), id))),
        { data: subscription },
      ),
    )
  }
}

type User = {
  ref: {
    id: string
  }
  data: {
    stripe_customer_id?: string
  }
}

type Subscription = {
  id: string
  userId: object
  status: string
  price_id: string
}
