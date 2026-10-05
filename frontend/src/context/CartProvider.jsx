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

  function removeFromCart(id) {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  function increaseQty(id) {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  function decreaseQty(id) {
    setItems((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)   // quantity 0 → remove from cart
    )
  }

  const cartCount = items.reduce((total, item) => total + item.quantity, 0)
  const cartTotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, increaseQty, decreaseQty, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
