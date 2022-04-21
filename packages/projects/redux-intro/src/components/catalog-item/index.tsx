import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { State } from '../../store'
import type { Product } from '../../store/modules/cart/types'
import { addProductToCartRequest } from '../../store/modules/cart/actions'

export interface CatalogItemProps {
  product: Product
}

export const CatalogItem = ({ product }: CatalogItemProps) => {
  const dispatch = useDispatch()

  const hasFailedStockCheck = useSelector<State, boolean>((state) =>
    state.cart.failedStockCheck.includes(product.id),
  )

  const handleAddProductToCart = useCallback(
    () => dispatch(addProductToCartRequest(product)),
    [dispatch, product],
  )

  return (
    <article style={{ padding: '0.25rem' }}>
      <strong>{product.title}</strong> {' - '}
      <span>{product.price}</span>
      <button
        type='button'
        onClick={handleAddProductToCart}
        disabled={hasFailedStockCheck}
        style={{ margin: '0 0.5em' }}
      >
        Comprar
      </button>
      {hasFailedStockCheck && (
        <span style={{ color: 'red', marginLeft: '1em' }}>
          Falta de estoque
        </span>
      )}
    </article>
  )
}
