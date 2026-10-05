import Navbar from './components/Navbar'
import { useState } from 'react'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

function App() {
  const [cartCount, setCartCount] = useState(0)

  function addToCart() {
    setCartCount((prevCount) => prevCount + 1)
  }

  return (
    <div>
      <Navbar cartCount={cartCount} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop onAddToCart={addToCart} />} />
          <Route path="/shop/:category" element={<Shop onAddToCart={addToCart} />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
