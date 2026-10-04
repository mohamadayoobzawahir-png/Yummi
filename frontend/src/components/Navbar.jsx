import { useState } from 'react'
import logo from '../assets/logo.jpg'

const categories = ['Home', 'Cakes', 'Fast Food', 'Sweets']

function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false)   // menu starts closed

  return (
    <nav className="navbar">
      <img src={logo} alt="Yummiii logo" width="60" />

      <a href="#" className="cart-link">🛒 <span className="cart-badge">{cartCount}</span></a>

      <button
        className="menu-btn"
        onClick={() => setIsOpen(prev => !prev)}
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        {isOpen ? '✕' : '☰'}
      </button>

      <div className={isOpen ? 'nav-links open' : 'nav-links'}>
        {categories.map((name) => (
          <a href="#" key={name}>{name}</a>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
