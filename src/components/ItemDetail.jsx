import { Link } from 'react-router-dom'
import { useCart } from '../context/useCart'
import ItemCount from './ItemCount'

const currencyFormatter = new Intl.NumberFormat('es-UY', {
  currency: 'UYU',
  style: 'currency',
})

const ItemDetail = ({ item }) => {
  const { addItem, isInCart } = useCart()
  const added = isInCart(item.id)

  const handleAdd = (quantity) => {
    addItem(item, quantity)
  }

  return (
    <article className="detail-layout">
      <img className="detail-image" src={item.image} alt={item.name} />
      <div className="detail-content">
        <p className="tag">{item.category}</p>
        <h1>{item.name}</h1>
        <p>{item.description}</p>
        <p className="detail-price">{currencyFormatter.format(item.price)}</p>

        {added ? (
          <div className="added-box">
            <p>Producto agregado al carrito.</p>
            <Link className="button" to="/cart">
              Finalizar compra
            </Link>
            <Link className="button secondary" to="/">
              Seguir comprando
            </Link>
          </div>
        ) : (
          <ItemCount stock={item.stock} onAdd={handleAdd} />
        )}
      </div>
    </article>
  )
}

export default ItemDetail
