import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../services/productService'
import ItemDetail from './ItemDetail'
import Loader from './Loader'

const ItemDetailContainer = () => {
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const { itemId } = useParams()

  useEffect(() => {
    setLoading(true)
    setError('')

    getProductById(itemId)
      .then((product) => {
        if (!product) {
          setError('No encontramos ese producto.')
          return
        }

        setItem(product)
      })
      .catch(() => setError('No pudimos cargar el detalle del producto.'))
      .finally(() => setLoading(false))
  }, [itemId])

  if (loading) {
    return <Loader text="Cargando detalle..." />
  }

  if (error) {
    return (
      <section className="page-section">
        <p className="empty-state">{error}</p>
        <Link className="button secondary narrow" to="/">
          Volver al catalogo
        </Link>
      </section>
    )
  }

  return <ItemDetail item={item} />
}

export default ItemDetailContainer
