import { Coffee } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { categories } from '../data/products'
import CartWidget from './CartWidget'

const NavBar = () => {
  return (
    <header className="navbar">
      <NavLink className="brand" to="/">
        <Coffee size={28} />
        <span>Origen Cafe</span>
      </NavLink>

      <nav className="nav-links">
        <NavLink to="/">Catalogo</NavLink>
        {categories.map((category) => (
          <NavLink key={category} to={`/category/${category}`}>
            {category}
          </NavLink>
        ))}
      </nav>

      <CartWidget />
    </header>
  )
}

export default NavBar
