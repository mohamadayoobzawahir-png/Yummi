import { useState } from 'react'
import { CartContext } from './CartContext'

function CartProvider({ children }) {
  const [items, setItems] = useState([])   // e.g. [{ id: 1, name: 'Cake', price: 2500, quantity: 2 }]

  function addToCart(product) {
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)

      if (existing) {
        // already in the cart → add 1 to its quantity
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }

      // not in the cart yet → add it with quantity 1
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, cartCount }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider