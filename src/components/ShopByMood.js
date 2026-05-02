import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/shop-by-mood.css';

const moodData = [
  {
    mood: 'Soft',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    description: 'Minimalist & dreamy'
  },
  {
    mood: 'Dark',
    image: 'https://images.unsplash.com/photo-1503342217505-b57375b546d1?w=400&h=400&fit=crop',
    description: 'Bold & mysterious'
  },
  {
    mood: 'Vintage',
    image: 'https://images.unsplash.com/photo-1554521666-7efcaf00980c?w=400&h=400&fit=crop',
    description: 'Retro & nostalgic'
  },
  {
    mood: 'Street',
    image: 'https://images.unsplash.com/photo-1506755855726-617b92a0b568?w=400&h=400&fit=crop',
    description: 'Urban & edgy'
  }
];

function ShopByMood() {
  const navigate = useNavigate();

  const handleMoodClick = (mood) => {
    navigate(`/products?mood=${mood}`);
  };

  return (
    <section id="shop-mood" className="shop-by-mood">
      <div className="section-header">
        <h2>Shop by Mood</h2>
        <p>Find your vibe</p>
      </div>

      <div className="mood-grid">
        {moodData.map((item) => (
          <div 
            key={item.mood}
            className="mood-card"
            onClick={() => handleMoodClick(item.mood)}
          >
            <img src={item.image} alt={item.mood} />
            <div className="mood-overlay">
              <h3>{item.mood}</h3>
              <p>{item.description}</p>
              <button className="mood-btn">Explore</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ShopByMood;
