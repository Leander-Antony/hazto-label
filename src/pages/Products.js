import React, { useContext, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ProductContext } from '../App';
import ProductCard from '../components/ProductCard';
import { moods, categories } from '../data/mockData';
import '../styles/products-page.css';

function Products() {
  const { products } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const [selectedMood, setSelectedMood] = useState(searchParams.get('mood') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const moodMatch = !selectedMood || product.mood === selectedMood;
      const categoryMatch = !selectedCategory || product.category === selectedCategory;
      return moodMatch && categoryMatch;
    });
  }, [products, selectedMood, selectedCategory]);

  const handleMoodChange = (mood) => {
    setSelectedMood(mood === selectedMood ? '' : mood);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category === selectedCategory ? '' : category);
  };

  const handleClearFilters = () => {
    setSelectedMood('');
    setSelectedCategory('');
  };

  return (
    <main className="products-page">
      <div className="products-container">
        <div className="products-header">
          <h1>Our Collection</h1>
          <p>Discover your style</p>
        </div>

        <div className="products-wrapper">
          {/* Filters */}
          <aside className="filters-sidebar">
            <div className="filters-header">
              <h3>Filters</h3>
              
              <div className="filters-header-actions">
                {(selectedMood || selectedCategory) && (
                  <button className="clear-filters" onClick={handleClearFilters}>
                    Clear
                  </button>
                )}
                
                <button 
                  className="mobile-filters-toggle mobile-only"
                  onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
                >
                  {isMobileFiltersOpen ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className={`filters-content ${isMobileFiltersOpen ? 'is-open' : ''}`}>
              {/* Mood Filter */}
              <div className="filter-group">
                <h4>Mood</h4>
                <div className="filter-options">
                  {moods.map(mood => (
                    <label key={mood} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedMood === mood}
                        onChange={() => handleMoodChange(mood)}
                      />
                      <span>{mood}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="filter-group">
                <h4>Category</h4>
                <div className="filter-options">
                  {categories.map(category => (
                    <label key={category} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedCategory === category}
                        onChange={() => handleCategoryChange(category)}
                      />
                      <span>{category}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <section className="products-grid-section">
            <div className="products-count">
              {filteredProducts.length} products
            </div>

            <div className="products-grid">
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="no-products">
                  <p>No products match your filters</p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Products;
