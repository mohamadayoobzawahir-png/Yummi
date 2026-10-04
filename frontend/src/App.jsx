import logo from './assets/logo.jpg'
import Navbar from './components/Navbar'
import products from './data/products'
import ProductCard from './components/ProductCard'

function App() {
  return (
    <div>
      <Navbar cartCount={12}/>
      <main>
        <section className="hero">
          <img src={logo} alt="Yummiii logo" width="200" className="hero-logo" />
          <h1>Welcome to Yummiii!</h1>
          <p>Cakes, fast food and sweets, delivered to your door.</p>
          <div className="dots">
            <span></span><span></span><span></span>
          </div>
          <button className="btn btn-cta">Shop Now</button>
        </section>

        <section className="products">
          <h2 className="section-title">Our Yummy Treats</h2>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
