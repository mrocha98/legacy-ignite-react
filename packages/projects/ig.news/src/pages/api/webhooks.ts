import { NextApiRequest, NextApiResponse } from 'next'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'
import { StripeService } from '../../services/stripe.service'
import type { Stripe } from 'stripe'
import { convertRequestToBuffer } from './_lib/buffer_utils'
import { persistSubscription } from './_lib/manage_subscription'

export const config = {
  api: {
    bodyParser: false,
  },
}

const relevantEvents = new Set([
  'checkout.session.completed',
  'customer.subscription.updated',
  'customer.subscription.deleted',
])

export default async function webhooks(
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
  const stripeService = new StripeService()
  const buffer = await convertRequestToBuffer(req)
  const secret = req.headers['stripe-signature'] as string
  let event: Stripe.Event

  try {
    event = stripeService.constructWebhookEvent(buffer, secret)
  } catch (error) {
    if (error instanceof Error) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .send(`Webhook error: ${error.message}`)
    }
    return res.status(StatusCodes.NOT_IMPLEMENTED)
  }

  if (relevantEvents.has(event.type)) {
    try {
      await handleEvent(event)
    } catch (error) {
      if (error instanceof Error) {
        return res
          .status(StatusCodes.OK)
          .json({ error: `Webhook handler failed. ${error.message}` })
      }
      return res.status(StatusCodes.NOT_IMPLEMENTED)
    }
  }

  return res.status(StatusCodes.OK).json({ received: true })
}

async function handleEvent(event: Stripe.Event) {
  if (
    ['customer.subscription.updated', 'customer.subscription.deleted'].includes(
      event.type,
    )
  ) {
    const subscription = event.data.object as Stripe.Subscription
    await persistSubscription(subscription.id, subscription.customer.toString())
  } else if (event.type === 'checkout.session.completed') {
    const checkoutSession = event.data.object as Stripe.Checkout.Session
    await persistSubscription(
      checkoutSession.subscription!.toString(),
      checkoutSession.customer!.toString(),
      true,
    )
  } else throw new Error('Undhandled event.')
}
