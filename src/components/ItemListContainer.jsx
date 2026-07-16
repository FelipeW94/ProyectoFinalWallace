import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getProducts } from '../services/productService'
import ItemList from './ItemList'
import Loader from './Loader'

const ItemListContainer = ({ greeting }) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { categoryId } = useParams()

  useEffect(() => {
    setLoading(true)
    setError('')

    getProducts(categoryId)
      .then(setItems)
      .catch(() => setError('No pudimos cargar los productos. Intentalo nuevamente.'))
      .finally(() => setLoading(false))
  }, [categoryId])

  return (
    <section className="page-section">
      <div className="section-heading">
        <p className="eyebrow">E-commerce React + Firestore</p>
        <h1>{categoryId ? `${greeting}: ${categoryId}` : greeting}</h1>
      </div>

      {loading && <Loader text="Cargando productos..." />}
      {error && <p className="empty-state">{error}</p>}
      {!loading && !error && <ItemList products={items} />}
    </section>
  )
}

export default ItemListContainer
