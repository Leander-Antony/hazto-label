import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import '../styles/navbar.css';
import PillNav from './PillNav';

function Navbar({ cartCount }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/products' }
  ];

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <PillNav
          logo={'/hazto_logo.jpg'}
          logoAlt={'HAZTO LABEL'}
          items={items}
          activeHref={location.pathname}
          className="custom-nav"
          ease={'power2.easeOut'}
          baseColor={'transparent'}
          pillColor={'rgba(255,255,255,0.04)'}
          hoveredPillTextColor={'#ffffff'}
          pillTextColor={'rgba(255,255,255,0.95)'}
          initialLoadAnimation={false}
        />

        <div className="nav-actions">
          <Link to="/cart" className="nav-link cart-link">
            <ShoppingCart size={20} />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
