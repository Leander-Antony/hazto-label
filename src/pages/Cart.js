import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../App';
import { Trash2, MessageCircle } from 'lucide-react';
import '../styles/cart-page.css';

const WHATSAPP_PHONE = '918056607351'; // +91 80566 07351

function Cart() {
  const { cart, removeFromCart, updateCartQuantity } = useContext(CartContext);

  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleWhatsApp = () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    let cartMessage = 'Hi, I want to order:\n\n';
    cart.forEach((item, index) => {
      cartMessage += `${index + 1}. ${item.name} (Size ${item.size}) x${item.quantity}\n`;
    });
    cartMessage += `\nTotal: ₹${totalPrice.toLocaleString('en-IN')}`;

    const encodedMessage = encodeURIComponent(cartMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  if (cart.length === 0) {
    return (
      <main className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-content">
            <h1>Your cart is empty</h1>
            <p>Start shopping to fill it with amazing pieces</p>
            <Link to="/products" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        <div className="cart-wrapper">
          {/* Cart Items */}
          <div className="cart-items">
            {cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <div className="item-image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="item-details">
                  <h3>{item.name}</h3>
                  <p className="item-size">Size: {item.size}</p>
                  <p className="item-price">₹{item.price.toLocaleString('en-IN')}</p>
                </div>
                <div className="item-quantity">
                  <button onClick={() => updateCartQuantity(item.id, item.size, item.quantity - 1)}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateCartQuantity(item.id, item.size, item.quantity + 1)}>+</button>
                </div>
                <div className="item-subtotal">
                  ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id, item.size)}
                  title="Remove item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <aside className="cart-summary">
            <div className="summary-box">
              <h2>Order Summary</h2>
              
              <div className="summary-row">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>FREE</span>
              </div>
              <div className="summary-row">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="summary-total">
                <span>Total</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              <button className="btn btn-whatsapp full-width" onClick={handleWhatsApp}>
                <MessageCircle size={20} />
                Complete Order on WhatsApp
              </button>

              <Link to="/products" className="btn btn-outline full-width">
                Continue Shopping
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;
