import products from '../data/products'
import ProductCard from '../components/ProductCard'

function Shop({ onAddToCart }) {
    return (
        <section className="products">
          <h2 className="section-title">Our Yummy Treats</h2>
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
            ))}
          </div>
        </section>
    )
}

export default Shop