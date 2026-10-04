function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <div className="product-img">
        <img src={product.image} alt={product.name} />
      </div>
      <div className="product-info">
        <span className="category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="price">Rs. {product.price.toLocaleString()}</p>
        {product.inStock ? (
          <button className="btn btn-add" onClick={onAddToCart}>
            Add to Cart
          </button>
        ) : (
          <button className="btn btn-out-of-stock" disabled>
            Out of Stock
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductCard
