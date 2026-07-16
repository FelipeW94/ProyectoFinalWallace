import { Trash2 } from 'lucide-react'

const currencyFormatter = new Intl.NumberFormat('es-UY', {
  currency: 'UYU',
  style: 'currency',
})

const CartItem = ({ item, onRemove }) => {
  return (
    <article className="cart-item">
      <img src={item.image} alt={item.name} />
      <div>
        <h3>{item.name}</h3>
        <p>Cantidad: {item.quantity}</p>
        <p>Subtotal: {currencyFormatter.format(item.price * item.quantity)}</p>
      </div>
      <button type="button" className="icon-button" onClick={() => onRemove(item.id)} aria-label="Eliminar producto">
        <Trash2 size={20} />
      </button>
    </article>
  )
}

export default CartItem
