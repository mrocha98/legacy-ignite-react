import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/client'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

import { StripeService } from '../../services/stripe.service'
import { FaunaDBService } from '../../services/faunadb.service'

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const post = 'POST'
  if (req.method !== post) {
    res.setHeader('Allow', post)
    return res
      .status(StatusCodes.METHOD_NOT_ALLOWED)
      .end(ReasonPhrases.METHOD_NOT_ALLOWED)
  }

  const session = await getSession({ req })
  const stripeService = new StripeService()
  const faunaDBService = new FaunaDBService()

  const user = await faunaDBService.findUserByEmail(session!.user!.email!)

  let customerId = user.data.stripe_customer_id

  if (!customerId) {
    const stripeCustomer = await stripeService.createCustomer(
      session!.user!.email!,
    )

    await faunaDBService.updateUser(user, stripeCustomer)

    customerId = stripeCustomer.id
  }

  const stripeCheckoutSession = await stripeService.createCheckoutSession(
    customerId,
  )

  return res
    .status(StatusCodes.OK)
    .json({ sessionId: stripeCheckoutSession.id } as SubscribeSuccessBody)
}

export type SubscribeSuccessBody = {
  sessionId: string
}
