import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import AdminPanel from './pages/AdminPanel';
import { mockProducts } from './data/mockData';

export const CartContext = createContext();
export const ProductContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const seedProducts = () => {
    setProducts(mockProducts);
  };

  // Initialize products from localStorage or mock data
  useEffect(() => {
    const loadProductsFromFile = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/products`);
        if (!res.ok) throw new Error('unable to fetch');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          return;
        }
        seedProducts();
      } catch (err) {
        seedProducts();
      }
    };

    loadProductsFromFile();

    // Load cart from localStorage
    const storedCart = localStorage.getItem('hazto_cart');
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch {
        setCart([]);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('hazto_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, size, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id && item.size === size);
    
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id && item.size === size
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, size, quantity }]);
    }
  };

  const removeFromCart = (productId, size) => {
    setCart(cart.filter(item => !(item.id === productId && item.size === size)));
  };

  const updateCartQuantity = (productId, size, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
    } else {
      setCart(cart.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      ));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addProduct = (newProduct) => {
    // persist via API
    fetch(`${API_BASE_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProduct)
    })
    .then(r => r.json())
    .then(created => setProducts(prev => [...prev, created]))
    .catch(() => setProducts(prev => [...prev, { ...newProduct, id: Date.now() }]));
  };

  const updateProduct = (productId, updatedData) => {
    fetch(`${API_BASE_URL}/api/products/${productId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedData)
    })
    .then(r => {
      if (!r.ok) throw new Error('update failed');
      return r.json();
    })
    .then(updated => setProducts(prev => prev.map(p => p.id === productId ? updated : p)))
    .catch(() => setProducts(prev => prev.map(p => p.id === productId ? { ...p, ...updatedData } : p)));
  };

  const deleteProduct = (productId) => {
    fetch(`${API_BASE_URL}/api/products/${productId}`, { method: 'DELETE' })
      .then(r => {
        if (!r.ok) throw new Error('delete failed');
        setProducts(prev => prev.filter(p => p.id !== productId));
      })
      .catch(() => {
        const updatedProducts = products.filter(p => p.id !== productId);
        if (updatedProducts.length > 0) {
          setProducts(updatedProducts);
        } else {
          seedProducts();
        }
      });
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCartQuantity, clearCart }}>
        <Router>
          <Navbar cartCount={cart.length} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<AdminPanel />} />
          </Routes>
        </Router>
      </CartContext.Provider>
    </ProductContext.Provider>
  );
}

export default App;
