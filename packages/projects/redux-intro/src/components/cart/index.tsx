import { useSelector } from 'react-redux'
import type { State } from '../../store'
import type { CartItem } from '../../store/modules/cart/types'

export const Cart = () => {
  const cart = useSelector<State, CartItem[]>((state) => state.cart.items)

  return (
    <table>
      <thead>
        <tr style={{ border: '1px solid white' }}>
          <th>Produto</th>
          <th>Preço</th>
          <th>Quantidade</th>
          <th>Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {cart.map(({ product, quantity }) => (
          <tr key={product.id} style={{ border: '1px solid white' }}>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>{quantity}</td>
            <td>{(product.price * quantity).toFixed(2)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
