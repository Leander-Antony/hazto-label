import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import '../styles/product-card.css';
import { CartContext } from '../App';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useContext(CartContext);
  const frontImage = product.images?.[0] || product.image;
  const backImage = product.images?.[1] || product.image;

  return (
    <div className="product-card-wrapper">
      <Link to={`/products/${product.id}`} className="product-card-link">
        <div 
          className="product-card"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="product-image-container">
            <img 
              src={isHovered ? backImage : frontImage} 
              alt={product.name}
              className="product-image"
            />
            <div className="overlay-actions" aria-hidden={!isHovered}>
              <button
                className="quick-add"
                onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(product, (product.sizes && product.sizes[0]) || null, 1); }}
                title="Quick add to cart"
              >
                <ShoppingBag size={20} strokeWidth={2.5} />
              </button>
            </div>
          </div>
          
          <div className="product-info">
            <p className="product-mood">{product.mood}</p>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
