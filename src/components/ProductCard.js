import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import '../styles/product-card.css';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image"
        />
        {isHovered && (
          <div className="product-overlay">
            <Link to={`/products/${product.id}`} className="overlay-btn view-btn">
              <Eye size={18} />
              View Details
            </Link>
          </div>
        )}
      </div>
      
      <div className="product-info">
        <p className="product-mood">{product.mood}</p>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
      </div>
    </div>
  );
}

export default ProductCard;
