import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { firebaseReady } from '../firebase/config'
import { createOrder } from '../services/productService'

const initialForm = {
  email: '',
  name: '',
  phone: '',
}

const CheckoutForm = () => {
  const [buyer, setBuyer] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [error, setError] = useState('')
  const { cart, clearCart, totalPrice } = useCart()

  if (cart.length === 0 && !orderId) {
    return <Navigate to="/cart" replace />
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setBuyer((currentBuyer) => ({ ...currentBuyer, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setLoading(true)
    setError('')

    const order = {
      buyer,
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      })),
      total: totalPrice,
    }

    try {
      const responseId = await createOrder(order)
      setOrderId(responseId)
      clearCart()
      setBuyer(initialForm)
    } catch {
      setError('No pudimos generar la orden. Revisa Firebase e intentalo nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  if (orderId) {
    return (
      <section className="page-section centered">
        <p className="eyebrow">Compra confirmada</p>
        <h1>Orden generada</h1>
        <p className="order-id">{orderId}</p>
        {!firebaseReady && (
          <p className="empty-state compact">
            Este id es local porque todavia no configuraste las credenciales de Firebase.
          </p>
        )}
        <Link className="button narrow" to="/">
          Volver al catalogo
        </Link>
      </section>
    )
  }

  return (
    <section className="page-section checkout-layout">
      <div className="section-heading compact-heading">
        <p className="eyebrow">Datos del comprador</p>
        <h1>Checkout</h1>
        {!firebaseReady && (
          <p className="empty-state compact">
            Configura Firebase para que esta compra se guarde en Firestore.
          </p>
        )}
      </div>

      <form className="checkout-form" onSubmit={handleSubmit}>
        <label>
          Nombre completo
          <input name="name" value={buyer.name} onChange={handleChange} minLength="3" required />
        </label>
        <label>
          Telefono
          <input name="phone" value={buyer.phone} onChange={handleChange} minLength="6" required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={buyer.email} onChange={handleChange} required />
        </label>
        {error && <p className="form-error">{error}</p>}
        <button className="button" type="submit" disabled={loading}>
          {loading ? 'Generando orden...' : 'Confirmar compra'}
        </button>
      </form>
    </section>
  )
}

export default CheckoutForm
