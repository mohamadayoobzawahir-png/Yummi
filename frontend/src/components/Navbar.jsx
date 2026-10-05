import { useState } from 'react'
import logo from '../assets/logo.jpg'
import { Link } from 'react-router'
import { useCart } from '../context/useCart'

const categories = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/shop' },
  { label: 'Cakes', to: '/shop/cakes' },
  { label: 'Fast Food', to: '/shop/fast-food' },
  { label: 'Sweets', to: '/shop/sweets' },
]

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)   // menu starts closed

  const { cartCount } = useCart()

  return (
    <nav className="navbar">
      <img src={logo} alt="Yummiii logo" width="60" />

      <Link to="/cart" className="cart-link">
        🛒 <span className="cart-badge">{cartCount}</span>
      </Link>

      <button
        className="menu-btn"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <div className={isOpen ? 'nav-links open' : 'nav-links'}>
        {categories.map((category) => (
          <Link to={category.to} key={category.to} onClick={() => setIsOpen(false)}>
            {category.label}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
