import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Instagram, Sun, Moon } from 'lucide-react';
import '../styles/navbar.css';
import PillNav from './PillNav';

function Navbar({ cartCount }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/products' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        
        <Link to="/" className="navbar-logo">
          HAZTO
        </Link>
        
        <PillNav
          logo={'/hazto_logo.jpg'}
          logoAlt={'HAZTO LABEL'}
          items={items}
          activeHref={location.pathname}
          className="custom-nav"
          initialLoadAnimation={false}
        />

        <div className="nav-actions">
          <button className="nav-link theme-toggle" onClick={toggleTheme} aria-label="Toggle Dark Mode" style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}>
            {isDarkMode ? <Sun size={18} strokeWidth={2.5} /> : <Moon size={18} strokeWidth={2.5} />}
          </button>
          
          <a href="https://www.instagram.com/hazto_label/" target="_blank" rel="noreferrer" className="nav-link instagram-link" title="Follow on Instagram">
            <Instagram size={18} strokeWidth={2.5} />
          </a>
          
          <Link to="/cart" className="nav-link cart-link">
            <ShoppingBag size={18} strokeWidth={2.5} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
