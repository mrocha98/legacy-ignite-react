import cla from 'classnames'
import { signIn, useSession } from 'next-auth/client'

import styles from './subscribe-button.module.scss'
import { HttpService } from '../../services/http.service'
import { SubscribeSuccessBody } from '../../pages/api/subscribe'
import { StripeJsService } from '../../services/stripe-js.service'
import { useCallback, useMemo } from 'react'

export interface SubscribeButtonProps {
  className?: string
  priceId: string
}

export const SubscribeButton = ({
  className,
  priceId,
}: SubscribeButtonProps) => {
  const http = new HttpService()
  const stripeJsService = useMemo(() => new StripeJsService(), [])
  const [session] = useSession()

  const handleSubscribe = useCallback(async () => {
    if (!session) {
      signIn('github')
      return
    }

    try {
      const response = await http.api.post<SubscribeSuccessBody>('/subscribe')
      const { sessionId } = response.data
      const stripeJs = await stripeJsService.getStripeJs()
      await stripeJs?.redirectToCheckout({ sessionId })
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message)
      }
    }
  }, [http.api, session, stripeJsService])

  return (
    <button
      onClick={handleSubscribe}
      type="button"
      className={cla(styles.wrapper, className)}
    >
      Subscribe now
    </button>
  )
}
