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
    <section
      className="hero"
      style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/hero.png)` }}
    >
      <div className="hero-overlay"></div>
      <div className="floating-soft" style={{ width: 260, height: 260, left: '8%', top: '18%', background: 'radial-gradient(circle, rgba(202,108,230,0.12), transparent 40%)' }} />
      <div className="floating-soft" style={{ width: 320, height: 320, right: '6%', bottom: '8%', background: 'radial-gradient(circle, rgba(35,6,41,0.08), transparent 40%)', animationDelay: '2s' }} />
      
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">HAZTO LABEL</h1>
          <p className="hero-tagline">From Cart to Confidence</p>
          <Link to="/products" className="hero-btn">
            Explore Collection
          </Link>
        </div>
      </div>

      <button className="scroll-indicator" onClick={scrollToSection}>
        <ChevronDown size={28} />
      </button>
    </section>
  );
}

export default Hero;
