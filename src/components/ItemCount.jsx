import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'

const ItemCount = ({ initial = 1, onAdd, stock }) => {
  const [quantity, setQuantity] = useState(initial)

  const decrease = () => {
    setQuantity((currentQuantity) => Math.max(currentQuantity - 1, initial))
  }

  const increase = () => {
    setQuantity((currentQuantity) => Math.min(currentQuantity + 1, stock))
  }

  if (stock === 0) {
    return <p className="empty-state compact">Producto sin stock</p>
  }

  return (
    <div className="item-count">
      <div className="quantity-controls">
        <button type="button" onClick={decrease} disabled={quantity <= initial} aria-label="Restar unidad">
          <Minus size={18} />
        </button>
        <strong>{quantity}</strong>
        <button type="button" onClick={increase} disabled={quantity >= stock} aria-label="Sumar unidad">
          <Plus size={18} />
        </button>
      </div>
      <button className="button" type="button" onClick={() => onAdd(quantity)}>
        Agregar al carrito
      </button>
      <small>Stock disponible: {stock}</small>
    </div>
  )
}

export default ItemCount
