import { Link } from 'react-router-dom'

const currencyFormatter = new Intl.NumberFormat('es-UY', {
  currency: 'UYU',
  style: 'currency',
})

const Item = ({ product }) => {
  return (
    <article className="product-card">
      <img src={product.image} alt={product.name} />
      <div className="product-info">
        <p className="tag">{product.category}</p>
        <h3>{product.name}</h3>
        <p className="price">{currencyFormatter.format(product.price)}</p>
        <p className={product.stock > 0 ? 'stock' : 'stock empty'}>
          {product.stock > 0 ? `${product.stock} unidades disponibles` : 'Producto sin stock'}
        </p>
        <Link className="button secondary" to={`/item/${product.id}`}>
          Ver detalle
        </Link>
      </div>
    </article>
  )
}

export default Item
