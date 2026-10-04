import { useState } from 'react'
import logo from '../assets/logo.jpg'

function Navbar({ cartCount }) {
  const [isOpen, setIsOpen] = useState(false)   // menu starts closed

  return (
    <nav className="navbar">
      <img src={logo} alt="Yummiii logo" width="60" />

      <a href="#" className="cart-link">🛒 ({cartCount})</a>

      <button className="menu-btn" onClick={() => setIsOpen(!isOpen)} 
      aria-label="Toggle menu" aria-expanded={isOpen}>
        {isOpen ? '✕' : '☰'}
      </button>

      <div className={isOpen ? 'nav-links open' : 'nav-links'}>
        <a href="#">Home</a>
        <a href="#">Cakes</a>
        <a href="#">Fast Food</a>
        <a href="#">Sweets</a>
      </div>
    </nav>
  )
}

export default Navbar