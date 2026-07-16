import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'

const CartWidget = () => {
  const { totalQuantity } = useCart()

  return (
    <Link className="cart-widget" to="/cart" aria-label="Ver carrito">
      <ShoppingCart size={22} />
      {totalQuantity > 0 && <span>{totalQuantity}</span>}
    </Link>
  )
}

export default CartWidget
