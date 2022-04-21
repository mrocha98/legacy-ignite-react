import { FaunaDBService } from '../../../services/faunadb.service'
import { StripeService } from '../../../services/stripe.service'

export async function persistSubscription(
  subscriptionId: string,
  customerId: string,
  createAction = false,
) {
  const faunaDbService = new FaunaDBService()
  const stripeService = new StripeService()

  const userRef = await faunaDbService.getUserRef(customerId)
  const subscription = await stripeService.retrieveSubscription(subscriptionId)
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  }

  if (createAction) {
    return faunaDbService.saveSubscription(subscriptionData)
  }

  return faunaDbService.updateSubscription(subscriptionId, subscriptionData)
}
