import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { useCart } from '../context/useCart'
import deliveryAreas from '../data/deliveryAreas'

const emptyForm = { name: '', phone: '', area: '', address: '', notes: '' }

// Returns an object of error messages. Empty object = everything is valid.
function validate(form) {
  const errors = {}
  if (!form.name.trim()) errors.name = 'Please enter your name'
  if (!/^07\d{8}$/.test(form.phone)) errors.phone = 'Enter a 10-digit mobile number starting with 07'
  if (!form.area) errors.area = 'Please choose your area'
  if (!form.address.trim()) errors.address = 'Please enter your delivery address'
  return errors
}

function Checkout() {
  const { items, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [form, setForm] = useState(emptyForm)
  const [errors, setErrors] = useState({})

  // One handler for every input: the input's `name` decides which field changes
  function handleChange(e) {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Derived values: calculated from state on every render, never stored
  const selectedArea = deliveryAreas.find((area) => area.name === form.area)
  const deliveryFee = selectedArea ? selectedArea.fee : 0
  const total = cartTotal + deliveryFee

  function handleSubmit(e) {
    e.preventDefault()
    const newErrors = validate(form)
    setErrors(newErrors)
    if (Object.keys(newErrors).length > 0) return    // has errors → stop here

    // Later: send the order to Laravel instead of building it here
    const order = {
      number: 'YUM-' + Date.now().toString().slice(-6),   // temporary; Laravel will give real numbers
      customer: form,
      items,
      subtotal: cartTotal,
      deliveryFee,
      total,
      payment: 'Cash on Delivery',
    }

    clearCart()
    navigate('/order-success', { state: { order } })   // go to the success page, carrying the order
  }

  if (items.length === 0) {
    return (
      <section className="cart">
        <h2 className="section-title">Your cart is empty 🛒</h2>
        <Link to="/shop" className="btn">Browse treats</Link>
      </section>
    )
  }

  return (
    <section className="checkout">
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <h2 className="section-title">Delivery details</h2>

        <label>
          Full name
          <input name="name" value={form.name} onChange={handleChange} />
        </label>
        {errors.name && <p className="error">{errors.name}</p>}

        <label>
          Phone
          <input name="phone" type="tel" inputMode="numeric" placeholder="07XXXXXXXX"
            value={form.phone} onChange={handleChange} />
        </label>
        {errors.phone && <p className="error">{errors.phone}</p>}

        <label>
          Area
          <select name="area" value={form.area} onChange={handleChange}>
            <option value="">Choose your area</option>
            {deliveryAreas.map((area) => (
              <option key={area.name} value={area.name}>
                {area.name} — {area.fee === 0 ? 'Free delivery' : `Rs. ${area.fee}`}
              </option>
            ))}
          </select>
        </label>
        {errors.area && <p className="error">{errors.area}</p>}

        <label>
          Address
          <textarea name="address" rows="3" value={form.address} onChange={handleChange} />
        </label>
        {errors.address && <p className="error">{errors.address}</p>}

        <label>
          Delivery notes <span className="optional">(optional)</span>
          <textarea name="notes" rows="2" placeholder="e.g. Call when you arrive"
            value={form.notes} onChange={handleChange} />
        </label>

        <div className="payment-box">
          💵 <strong>Cash on Delivery</strong>: pay when your order arrives
        </div>

        <button type="submit" className="btn btn-cta">
          Place Order · Rs. {total.toLocaleString()}
        </button>
      </form>

      <aside className="order-summary">
        <h3>Order summary</h3>
        {items.map((item) => (
          <p className="summary-row" key={item.id}>
            <span>{item.name} × {item.quantity}</span>
            <span>Rs. {(item.price * item.quantity).toLocaleString()}</span>
          </p>
        ))}
        <hr />
        <p className="summary-row"><span>Subtotal</span><span>Rs. {cartTotal.toLocaleString()}</span></p>
        <p className="summary-row">
          <span>Delivery</span>
          <span>{!selectedArea ? 'Choose area' : deliveryFee === 0 ? 'Free 🎉' : `Rs. ${deliveryFee}`}</span>
        </p>
        <p className="summary-row summary-total"><span>Total</span><span>Rs. {total.toLocaleString()}</span></p>
      </aside>
    </section>
  )
}

export default Checkout