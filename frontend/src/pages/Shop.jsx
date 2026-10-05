import { useParams } from 'react-router'
import products from '../data/products'
import ProductCard from '../components/ProductCard'

// 'Fast Food' → 'fast-food'
function toSlug(text) {
  return text.toLowerCase().replaceAll(' ', '-')
}

// 'fast-food' → 'Fast Food'
function toTitle(slug) {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function Shop() {
  const { category } = useParams()

  const visibleProducts = category
    ? products.filter((product) => toSlug(product.category) === category)
    : products

  const title = category ? toTitle(category) : 'Our Yummy Treats'

  return (
    <section className="products">
      <h2 className="section-title">{title}</h2>

      {visibleProducts.length === 0 && <p>No treats found 🍩</p>}

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}

export default Shop
