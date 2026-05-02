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

function App() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  const seedProducts = () => {
    setProducts(mockProducts);
    localStorage.setItem('hazto_products', JSON.stringify(mockProducts));
  };

  // Initialize products from localStorage or mock data
  useEffect(() => {
    const storedProducts = localStorage.getItem('hazto_products');
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        if (Array.isArray(parsedProducts) && parsedProducts.length > 0) {
          setProducts(parsedProducts);
        } else {
          seedProducts();
        }
      } catch {
        seedProducts();
      }
    } else {
      seedProducts();
    }

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
    const updatedProducts = [...products, { ...newProduct, id: Date.now() }];
    setProducts(updatedProducts);
    localStorage.setItem('hazto_products', JSON.stringify(updatedProducts));
  };

  const updateProduct = (productId, updatedData) => {
    const updatedProducts = products.map(p => 
      p.id === productId ? { ...p, ...updatedData } : p
    );
    setProducts(updatedProducts);
    localStorage.setItem('hazto_products', JSON.stringify(updatedProducts));
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(p => p.id !== productId);
    if (updatedProducts.length > 0) {
      setProducts(updatedProducts);
      localStorage.setItem('hazto_products', JSON.stringify(updatedProducts));
    } else {
      seedProducts();
    }
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
