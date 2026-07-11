import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ProductContext, CartContext } from '../App';
import ProductCard from '../components/ProductCard';
import { MessageCircle, ShoppingBag } from 'lucide-react';
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
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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
    return <div className="loading">LOADING MODULE...</div>;
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

  return (
    <main className="product-detail">
      
      <div className="product-detail-container">

        <div className="classic-split-grid">
          
          {/* LEFT: IMAGES */}
          <div className="classic-image-col">
            <div className="main-image">
              <img src={product.images?.[selectedImageIndex] || product.image} alt={product.name} />
              <div className="mood-badge">{product.mood}</div>
            </div>
            {product.images && product.images.length > 1 && (
              <div className="classic-thumbnails">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumbnail ${selectedImageIndex === idx ? 'active' : ''}`}
                    onClick={() => setSelectedImageIndex(idx)}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: DETAILS */}
          <div className="classic-details-col">
            <div className="details-header">
              <h1>{product.name}</h1>
              <p className="detail-category">CAT: {product.category}</p>
            </div>

            <div className="price-section">
              <span className="price">₹{product.price.toLocaleString('en-IN')}</span>
            </div>

            <div className="desc-section">
              <p className="description">{product.description}</p>
            </div>

            <div className="size-section">
              <label>SELECT SIZE</label>
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

            <div className="quantity-section">
              <label>QUANTITY</label>
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <span>{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
            </div>

            <div className="action-buttons">
              <button className="btn btn-primary full-width" onClick={handleAddToCart}>
                <ShoppingBag size={20} strokeWidth={2.5} />
                [ ACQUIRE ITEM ]
              </button>
              <button className="btn btn-outline full-width" onClick={handleWhatsApp}>
                <MessageCircle size={20} strokeWidth={2.5} />
                [ INQUIRE NOW ]
              </button>
            </div>

            {showNotification && (
              <div className="notification-banner">
                STATUS: ITEM ADDED TO CART
              </div>
            )}
          </div>
          
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="related-products">
          <div className="section-header">
            <h2>{`// SIMILAR ASSETS`}</h2>
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
