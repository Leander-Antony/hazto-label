import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Eye } from 'lucide-react';
import '../styles/product-card.css';
import BorderGlow from './BorderGlow';
import { CartContext } from '../App';

function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useContext(CartContext);

  return (
    <BorderGlow className="product-card-wrapper" glowColor="268 80 70" colors={["#ca6ce6","#ffe7c1","#230629"]} backgroundColor={'#120F17'}>
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
              <button
                className="quick-add"
                onClick={(e) => { e.stopPropagation(); addToCart(product, (product.sizes && product.sizes[0]) || null, 1); }}
              >
                <ShoppingCart size={14} />
              </button>
            </div>
          )}
        </div>
        
        <div className="product-info">
          <p className="product-mood">{product.mood}</p>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
      </div>
    </BorderGlow>
  );
}

export default ProductCard;
