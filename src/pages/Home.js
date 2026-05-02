import React, { useEffect } from 'react';
import Hero from '../components/Hero';
import ShopByMood from '../components/ShopByMood';
import FeaturedProducts from '../components/FeaturedProducts';
import '../styles/pages.css';

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="home-page">
      <Hero />
      <ShopByMood />
      <FeaturedProducts />
    </main>
  );
}

export default Home;
