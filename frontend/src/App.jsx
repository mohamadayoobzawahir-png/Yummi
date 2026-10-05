import Navbar from './components/Navbar'
import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Cart from './pages/Cart'
import NotFound from './pages/NotFound'

function App() {
  return (
    <div>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:category" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
