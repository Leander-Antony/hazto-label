import React, { useContext } from 'react';
import { ProductContext } from '../App';
import ProductCard from './ProductCard';
import '../styles/featured-products.css';

function FeaturedProducts() {
  const { products } = useContext(ProductContext);
  const featuredProducts = products.filter(product => product.featured);

  return (
    <section className="featured-products">
      <div className="section-header">
        <h2>Featured Collection</h2>
        <p>Handpicked favorites</p>
      </div>

      <div className="featured-grid">
        {featuredProducts.map((product) => (
          <div key={product.id} className="featured-item">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default FeaturedProducts;
