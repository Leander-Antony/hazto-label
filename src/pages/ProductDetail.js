import React, { useContext, useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext, CartContext } from '../App';
import ProductCard from '../components/ProductCard';
import { MessageCircle, ShoppingCart } from 'lucide-react';
import '../styles/product-detail.css';

const WHATSAPP_PHONE = '918056607351'; // +91 80566 07351

function ProductDetail() {
  const { id } = useParams();
  const { products } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const imageRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedSize(foundProduct.sizes[0]);
      setSelectedImageIndex(0);
    }
  }, [id, products]);

  if (!product) {
    return <div className="loading">Loading...</div>;
  }

  const relatedProducts = products.filter(
    p => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, selectedSize, quantity);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleWhatsApp = () => {
    const message = `Hi, I'm interested in:\n\nProduct: ${product.name}\nSize: ${selectedSize}\nQuantity: ${quantity}\nPrice: ₹${(product.price * quantity).toLocaleString('en-IN')}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleImageMouseMove = (e) => {
    if (!imageRef.current) return;
    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  const handleImageMouseEnter = () => setIsHoveringImage(true);
  const handleImageMouseLeave = () => setIsHoveringImage(false);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
    setIsHoveringImage(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <main className="product-detail">
      <div className="product-detail-container">
        <div className="product-detail-grid">
          {/* Image */}
          <div className="product-images">
            <div className="thumbnails-gallery">
              {product.images && product.images.map((img, idx) => (
                <button
                  key={idx}
                  className={`thumbnail ${selectedImageIndex === idx ? 'active' : ''}`}
                  onClick={() => handleThumbnailClick(idx)}
                >
                  <img src={img} alt={`${product.name} ${idx + 1}`} />
                </button>
              ))}
            </div>
            <div
              className="main-image"
              ref={imageRef}
              onMouseMove={handleImageMouseMove}
              onMouseEnter={handleImageMouseEnter}
              onMouseLeave={handleImageMouseLeave}
            >
              <img src={product.images?.[selectedImageIndex] || product.image} alt={product.name} />
              <div className="mood-badge">{product.mood}</div>
              {isHoveringImage && (
                <div 
                  className="image-zoom-preview" 
                  style={{ 
                    backgroundImage: `url('${product.images?.[selectedImageIndex] || product.image}')`,
                    backgroundPositionX: `${mousePos.x}%`, 
                    backgroundPositionY: `${mousePos.y}%` 
                  }} 
                />
              )}
            </div>
          </div>

          {/* Info */}
          <div className="product-details">
            <div className="details-header">
              <h1>{product.name}</h1>
              <p className="detail-category">{product.category}</p>
            </div>

            <div className="price-section">
              <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
            </div>

            <p className="description">{product.description}</p>

            {/* Size Selector */}
            <div className="size-section">
              <label>Size</label>
              <div className="size-options">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="quantity-section">
              <label>Quantity</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            {/* Colors Info */}
            {product.colors && (
              <div className="colors-section">
                <label>Available Colors</label>
                <div className="colors-list">
                  {product.colors.map(color => (
                    <span key={color} className="color-tag">{color}</span>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                <ShoppingCart size={20} />
                Add to Cart
              </button>
              <button className="btn btn-whatsapp" onClick={handleWhatsApp}>
                <MessageCircle size={20} />
                Chat on WhatsApp
              </button>
            </div>

            {showNotification && (
              <div className="notification">
                ✓ Added to cart!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="section-header">
            <h2>You May Also Like</h2>
          </div>
          <div className="related-grid">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

export default ProductDetail;
