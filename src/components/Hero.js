import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import '../styles/hero.css';

function Hero() {
  const scrollToSection = () => {
    const section = document.getElementById('shop-mood');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div className="marquee-container top-marquee">
        <div className="marquee">
          <span>STREETWEAR CAPSULE / THRIFT CURATED / Y2K VINTAGE / ARCHIVE FASHION /&nbsp;</span>
          <span>STREETWEAR CAPSULE / THRIFT CURATED / Y2K VINTAGE / ARCHIVE FASHION /&nbsp;</span>
        </div>
      </div>
      
      <div className="hero-content">
        <div className="hero-text-block">
          <h1 className="hero-title">HAZTO<br/>LABEL.</h1>
          <div className="hero-box">
            <p className="hero-tagline">FROM CART TO CONFIDENCE</p>
            <p className="hero-sub">PREMIUM CURATED ARCHIVE & STREETWEAR.</p>
          </div>
          <Link to="/products" className="btn btn-primary hero-btn">
            [ SHOP LATEST DROP ]
          </Link>
        </div>
      </div>

      <button className="scroll-indicator" onClick={scrollToSection} aria-label="Scroll down">
        <ChevronDown size={40} strokeWidth={3} />
      </button>

      <div className="marquee-container bottom-marquee">
        <div className="marquee marquee-reverse">
          <span>LIMITED STOCK / WORLDWIDE SHIPPING / QUALITY GUARANTEED /&nbsp;</span>
          <span>LIMITED STOCK / WORLDWIDE SHIPPING / QUALITY GUARANTEED /&nbsp;</span>
        </div>
      </div>
    </section>
  );
}

export default Hero;
