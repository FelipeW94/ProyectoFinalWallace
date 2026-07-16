import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import CartItem from './CartItem'

const currencyFormatter = new Intl.NumberFormat('es-UY', {
  currency: 'UYU',
  style: 'currency',
})

const Cart = () => {
  const { cart, clearCart, removeItem, totalPrice, totalQuantity } = useCart()

  if (cart.length === 0) {
    return (
      <section className="page-section centered">
        <h1>Carrito vacio</h1>
        <p className="empty-state">Todavia no agregaste productos.</p>
        <Link className="button narrow" to="/">
          Ver catalogo
        </Link>
      </section>
    )
  }

  return (
    <section className="page-section cart-layout">
      <div>
        <div className="section-heading compact-heading">
          <p className="eyebrow">Tu compra</p>
          <h1>Carrito</h1>
        </div>
        <div className="cart-list">
          {cart.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeItem} />
          ))}
        </div>
      </div>

      <aside className="summary">
        <h2>Resumen</h2>
        <p>Unidades: {totalQuantity}</p>
        <p className="summary-total">Total: {currencyFormatter.format(totalPrice)}</p>
        <Link className="button" to="/checkout">
          Ir al checkout
        </Link>
        <button className="button secondary" type="button" onClick={clearCart}>
          Vaciar carrito
        </button>
      </aside>
    </section>
  )
}

export default Cart
