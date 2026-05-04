import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/shop-by-mood.css';

const moodData = [
  {
    mood: 'Jerseys',
    image: 'https://i.ibb.co/WNgNK7G8/jersey.jpg',
    description: 'Sporty & bold'
  },
  {
    mood: 'Dark',
    image: 'https://i.ibb.co/JW7sdDwy/dark.jpg',
    description: 'Bold & mysterious'
  },
  {
    mood: 'Vintage',
    image: 'https://i.ibb.co/qY2p5d65/vintage.jpg',
    description: 'Retro & nostalgic'
  },
  {
    mood: 'Street',
    image: 'https://i.ibb.co/zTWKc05x/street.jpg',
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
