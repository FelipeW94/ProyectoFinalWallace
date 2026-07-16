import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Cart from './components/Cart'
import CheckoutForm from './components/CheckoutForm'
import ItemDetailContainer from './components/ItemDetailContainer'
import ItemListContainer from './components/ItemListContainer'
import NavBar from './components/NavBar'
import { CartProvider } from './context/CartContext'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <NavBar />
        <main className="app-shell">
          <Routes>
            <Route path="/" element={<ItemListContainer greeting="Cafe de Especialidad" />} />
            <Route path="/category/:categoryId" element={<ItemListContainer greeting="Productos por categoria" />} />
            <Route path="/item/:itemId" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutForm />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </CartProvider>
    </BrowserRouter>
  )
}

export default App
