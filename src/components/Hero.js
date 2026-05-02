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
      <video 
        className="hero-video"
        autoPlay 
        muted 
        loop
        playsInline
      >
        <source 
          src="https://videos.pexels.com/video-files/3571904/3571904-sd_640_360_25fps.mp4" 
          type="video/mp4"
        />
      </video>
      
      <div className="hero-overlay"></div>
      
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
