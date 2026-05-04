import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../App';
import { Edit2, Trash2, Plus, Lock } from 'lucide-react';
import '../styles/admin-panel.css';

const ADMIN_CODE = 'HAZTO2024';

function AdminPanel() {
  const navigate = useNavigate();
  const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [code, setCode] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    category: 'Jerseys',
    mood: '',
    sizes: [],
    colors: [],
    featured: false,
    frontImage: '',
    backImage: '',
    mockup1: '',
    mockup2: ''
  });

  const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL'];

  const handleSizeToggle = (size) => {
    setFormData(prev => {
      const sizes = prev.sizes || [];
      if (sizes.includes(size)) {
        return { ...prev, sizes: sizes.filter(s => s !== size) };
      }
      return { ...prev, sizes: [...sizes, size] };
    });
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleColorChange = (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      colors: value.split(',').map(c => c.trim()).filter(c => c)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.price || !formData.frontImage || !formData.backImage) {
      alert('Please fill all required fields (Name, Price, Front Image, Back Image)');
      return;
    }

    const images = [formData.frontImage, formData.backImage];
    if (formData.mockup1) images.push(formData.mockup1);
    if (formData.mockup2) images.push(formData.mockup2);
    const productData = {
      ...formData,
      price: parseInt(formData.price),
      image: formData.frontImage,
      images: images
    };
    delete productData.frontImage;
    delete productData.backImage;
    delete productData.mockup1;
    delete productData.mockup2;

    if (editingId) {
      updateProduct(editingId, productData);
      setEditingId(null);
    } else {
      addProduct(productData);
    }

    setFormData({
      name: '',
      price: '',
      description: '',
      category: 'Jerseys',
      mood: '',
      sizes: [],
      colors: [],
      featured: false,
      frontImage: '',
      backImage: '',
      mockup1: '',
      mockup2: ''
    });
    setShowForm(false);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      category: product.category,
      mood: product.mood,
      sizes: product.sizes,
      colors: product.colors || [],
      featured: Boolean(product.featured),
      frontImage: product.images && product.images[0] ? product.images[0] : product.image,
      backImage: product.images && product.images[1] ? product.images[1] : '',
      mockup1: product.images && product.images[2] ? product.images[2] : '',
      mockup2: product.images && product.images[3] ? product.images[3] : ''
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  const handleCodeSubmit = (e) => {
    e.preventDefault();
    if (code === ADMIN_CODE) {
      setIsAuthenticated(true);
      setCode('');
    } else {
      alert('Invalid code. Access denied.');
      setCode('');
    }
  };

  const renderProductForm = () => (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Product Name *</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="e.g., Black Oversized jersey"
        />
      </div>

      <div className="form-group">
        <label>Price (₹) *</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="1999"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product description"
          rows="4"
        ></textarea>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option>Jerseys</option>
            <option>Over sized</option>
            <option>pants</option>
          </select>
        </div>

        <div className="form-group">
          <label>Mood</label>
          <select
            name="mood"
            value={formData.mood}
            onChange={handleChange}
          >
            <option value="">-- Select Mood --</option>
            <option>Dark</option>
            <option>Vintage</option>
            <option>Street</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Image URL *</label>
        <input
          type="text"
          name="frontImage"
          value={formData.frontImage}
          onChange={handleChange}
          placeholder="Front image URL (required)"
        />
      </div>

      <div className="form-group">
        <label>Available Sizes</label>
        <div className="sizes-checkboxes">
          {AVAILABLE_SIZES.map(sz => (
            <label key={sz} className="checkbox-label size-label">
              <input
                type="checkbox"
                checked={formData.sizes && formData.sizes.includes(sz)}
                onChange={() => handleSizeToggle(sz)}
              />
              {sz}
            </label>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Back Image URL *</label>
        <input
          type="text"
          name="backImage"
          value={formData.backImage}
          onChange={handleChange}
          placeholder="Back image URL (required)"
        />
      </div>

      <div className="form-group">
        <label>Mockup 1 (Optional)</label>
        <input
          type="text"
          name="mockup1"
          value={formData.mockup1}
          onChange={handleChange}
          placeholder="Mockup 1 image URL"
        />
      </div>

      <div className="form-group">
        <label>Mockup 2 (Optional)</label>
        <input
          type="text"
          name="mockup2"
          value={formData.mockup2}
          onChange={handleChange}
          placeholder="Mockup 2 image URL"
        />
      </div>

      <div className="form-group">
        <label>Colors (comma-separated)</label>
        <input
          type="text"
          value={formData.colors.join(', ')}
          onChange={handleColorChange}
          placeholder="e.g., Black, Navy, White"
        />
      </div>

      <div className="form-group form-checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
          />
          Featured product
        </label>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary">
          {editingId ? 'Update Product' : 'Add Product'}
        </button>
        <button 
          type="button" 
          className="btn btn-outline"
          onClick={() => {
            setShowForm(false);
            setEditingId(null);
          }}
        >
          Cancel
        </button>
      </div>
    </form>
  );

  if (!isAuthenticated) {
    return (
      <main className="admin-panel">
        <div className="admin-auth-container">
          <div className="auth-box">
            <div className="auth-icon">
              <Lock size={48} />
            </div>
            <h1>Admin Access</h1>
            <p>Enter the admin code to access this panel</p>
            <form onSubmit={handleCodeSubmit} className="auth-form">
              <input
                type="password"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter admin code"
                autoFocus
                className="code-input"
              />
              <button type="submit" className="btn btn-primary">
                Unlock
              </button>
            </form>
            <button 
              onClick={() => navigate('/')}
              className="btn btn-outline back-btn"
            >
              Back to Home
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-panel">
      <div className="admin-container">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <button 
            className="btn btn-primary"
            onClick={() => {
              setShowForm(!showForm);
              setEditingId(null);
                  if (!showForm) {
                setFormData({
                  name: '',
                  price: '',
                  description: '',
                  category: 'Jerseys',
                  mood: '',
                  sizes: [],
                  colors: [],
                  featured: false,
                  frontImage: '',
                  backImage: '',
                  mockup1: '',
                  mockup2: ''
                });
              }
            }}
          >
            <Plus size={18} />
            {editingId ? 'Cancel Edit' : 'Add New Product'}
          </button>
        </div>

        {showForm && !editingId && (
          <div className="admin-form-section">
            {renderProductForm()}
          </div>
        )}

        {/* Products Table */}
        <div className="products-table-section">
          <h2>Products ({products.length})</h2>
          
          {products.length === 0 ? (
            <p className="no-products">No products yet. Add one to get started!</p>
          ) : (
            <div className="products-table-wrapper">
              <table className="products-table">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Mood</th>
                    <th>Featured</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <React.Fragment key={product.id}>
                    <tr>
                      <td>
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="table-image"
                        />
                      </td>
                      <td className="product-name">{product.name}</td>
                      <td>{product.category}</td>
                      <td>{product.mood}</td>
                      <td>{product.featured ? 'Yes' : 'No'}</td>
                      <td>₹{product.price ? product.price.toLocaleString('en-IN') : 'N/A'}</td>
                      <td className="action-buttons">
                        <button
                          className="action-btn edit"
                          onClick={() => handleEdit(product)}
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          className="action-btn delete"
                          onClick={() => handleDelete(product.id)}
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                    {editingId === product.id && showForm && (
                      <tr className="inline-edit-row">
                        <td colSpan="7">
                          <div className="inline-edit-panel">
                            <div className="inline-edit-header">
                            </div>
                            {renderProductForm()}
                          </div>
                        </td>
                      </tr>
                    )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default AdminPanel;
