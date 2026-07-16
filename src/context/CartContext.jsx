import { useMemo, useState } from 'react'
import { CartContext } from './CartStateContext'

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])

  const addItem = (item, quantity) => {
    setCart((currentCart) => {
      const existingItem = currentCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: Math.min(cartItem.quantity + quantity, item.stock) }
            : cartItem,
        )
      }

      return [...currentCart, { ...item, quantity }]
    })
  }

  const removeItem = (itemId) => {
    setCart((currentCart) => currentCart.filter((item) => item.id !== itemId))
  }

  const clearCart = () => {
    setCart([])
  }

  const isInCart = (itemId) => cart.some((item) => item.id === itemId)

  const totalQuantity = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  const totalPrice = useMemo(
    () => cart.reduce((total, item) => total + item.price * item.quantity, 0),
    [cart],
  )

  const value = {
    addItem,
    cart,
    clearCart,
    isInCart,
    removeItem,
    totalPrice,
    totalQuantity,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
