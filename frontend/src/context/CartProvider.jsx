import { useState, useEffect } from 'react'
import { CartContext } from './CartContext'

function CartProvider({ children }) {
  // LOAD: read the saved cart once, when the app starts
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('yummiii-cart')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []    // saved data is broken → start with an empty cart
    }
  })

  // SAVE: write the cart to storage every time items change
  useEffect(() => {
    localStorage.setItem('yummiii-cart', JSON.stringify(items))
  }, [items])

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
