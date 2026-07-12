# HAZTO LABEL - Quick Start Guide

## ⚡ Quick Setup (5 minutes)

### Step 1: Install Node.js
If you don't have Node.js installed:
1. Download from https://nodejs.org/ (LTS version recommended)
2. Install and verify: `node --version`

### Step 2: Install Dependencies
```bash
cd d:\Desktop\_\Git\hazto-label
npm install
```

If you are setting up the Firestore backend, also install the server dependencies:
```bash
cd server
npm install
```

This will install:
- React 18.2.0
- React Router 6.11.0
- Lucide Icons
- React Scripts

### Step 3: Start Development Server
```bash
npm start
```

The browser will automatically open to `http://localhost:3000`

### Step 4: Start the Firestore backend
Open a second terminal, then run:
```bash
cd d:\Desktop\_\Git\hazto-label\server
npm start
```

The API will run on `http://localhost:5000` by default.

### Step 5: Configure Firebase
1. Create a Firebase project in the Firebase console.
2. Enable Firestore Database in that project.
3. Create a service account key from Project Settings > Service accounts.
4. Copy `server/.env.example` to `server/.env` and fill in the Firebase values.
5. Copy `.env.example` to `.env` if you want to override the frontend API URL.

The backend reads these values:
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY`

The frontend uses:
- `REACT_APP_API_BASE_URL`

---

## 🎯 What You Get

### ✅ Fully Functional Features
- ✔️ **Homepage** with marquee hero, mood categories, rigid product grid
- ✔️ **Product Listing** with brutalist sidebar filters
- ✔️ **Product Detail Page** with size/quantity selection
- ✔️ **Shopping Cart** with real-time calculations
- ✔️ **Admin Panel** (access at `/admin`) to manage products
- ✔️ **WhatsApp Integration** for checkout
- ✔️ **Responsive Design** works on all devices
- ✔️ **Smooth Animations** and hover effects
- ✔️ **Persistent Storage** (Firestore)

### 🎨 Design Elements
- Y2K Streetwear Brutalist aesthetic
- Dynamic Dark/Light mode support
- Premium typography (Anton + Space Grotesk)
- Sharp edges and harsh offset drop shadows
- App-like fixed-screen product detail layout

---

## 🗂️ File Structure Overview

```
src/
├── components/       # Reusable UI components
├── pages/           # Full page components
├── data/            # Mock product data
├── styles/          # CSS files (one per component)
├── App.js           # Main app with routing
└── index.js         # Entry point
```

---

## 🛠️ Common Tasks

### 🏪 Add a New Product
1. Go to `http://localhost:3000/admin`
2. Click "Add New Product"
3. Fill in:
   - Product Name
   - Price
    - Category (jerseys, Over sized, pants)
   - Mood (Dark, Vintage, Street)
   - Description
   - Image URL (from Unsplash or your server)
   - Available colors
4. Click "Add Product"

### 📱 Update WhatsApp Phone Number
Edit these two files with your WhatsApp number:

**File 1**: `src/pages/ProductDetail.js` (line ~11)
```javascript
const WHATSAPP_PHONE = '919876543210'; // Change this
```

**File 2**: `src/pages/Cart.js` (line ~7)
```javascript
const WHATSAPP_PHONE = '919876543210'; // Change this
```

Format: Include country code (e.g., +91 for India, +1 for USA)

### 🎨 Customize Colors
Edit `src/styles/global.css` (lines 14-22 and 25-33 for dark mode):
```css
:root {
  --primary-dark: #111111;      /* Main text, borders */
  --primary-light: #fae4cc;     /* Pale peach background */
  --accent-color: #d1b3ff;      /* Lilac accent */
  --text-on-accent: #111111;
  /* ... update as needed */
}

[data-theme="dark"] {
  --primary-dark: #f4f4f0;      /* Newspaper white text */
  --primary-light: #111111;     /* Pitch black background */
  --accent-color: #ff00ff;      /* Hot pink accent */
  --text-on-accent: #111111;
}
```

### 📦 Update Product Images
Products use Unsplash URLs. To use your own:
1. Upload images to a cloud service (Cloudinary, AWS S3, etc.)
2. Get the image URL
3. Use it when adding/editing products

---

## 🚀 Deploy to Production

### Option 1: Netlify (Recommended - Free)
1. Build the project:
   ```bash
   npm run build
   ```
2. Create account at https://netlify.com
3. Drag & drop the `build` folder
4. Done! Get a live URL

### Option 2: Vercel (Free)
1. Create account at https://vercel.com
2. Connect your GitHub repo
3. Auto-deploys on every push

### Option 3: GitHub Pages
```bash
npm install --save-dev gh-pages
npm run build
npm run deploy
```

---

## 🐛 Troubleshooting

### Issue: `npm install` fails
**Solution**: 
```bash
npm cache clean --force
npm install
```

### Issue: Port 3000 already in use
**Solution**:
```bash
npm start -- --port 3001
```

### Issue: Changes not showing
**Solution**:
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Clear browser cache

### Issue: WhatsApp link not working
**Solution**:
- Verify phone number format: `919876543210` (no + or spaces)
- Test with: `https://wa.me/919876543210`

### Issue: Products not saving
**Solution**:
- Check the server can reach Firestore
- Open the Firebase console and inspect the `products` collection
- Verify the API response from `/api/products`

---

## 📊 Data Storage

All product data is stored in Firestore:

| Collection | Purpose |
|------------|---------|
| `products` | Product catalog |

To clear the catalog, delete the `products` collection from the Firebase console.

---

## 🎬 Sample Workflow

### Test Admin Panel
1. Go to `/admin`
2. Add product: "Blue Vintage Jacket"
   - Price: 2999
   - Category: Pants
   - Mood: Vintage
   - Image: https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500
3. Click "Add Product"
4. Go back to `/products`
5. Filter by "Vintage" mood
6. See your product!

### Test Shopping Flow
1. Browse `/products`
2. Click a product
3. Select size + quantity
4. Click "Add to Cart"
5. Go to `/cart`
6. Click "Complete Order on WhatsApp"
7. Message appears pre-filled on WhatsApp!

---

## 📱 Mobile Testing

### Test Responsive Design
1. Open DevTools: `F12`
2. Click device icon (top-left)
3. Select device (iPhone 12, iPad, etc.)
4. Resize and test

### Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 🔐 Security Notes

⚠️ **Important for Production**:
1. Never commit sensitive data to git
2. WhatsApp number is visible in source code (acceptable for this use case)
3. Use environment variables for API keys (if adding backend)
4. Validate data before sending to services

---

## 📞 API/Integration Reference

### WhatsApp API Format
```
https://wa.me/{PHONE_NUMBER}?text={ENCODED_MESSAGE}
```

Example:
```
https://wa.me/919876543210?text=Hi%2C%20I%27m%20interested%20in%20a%20product
```

### Firestore API
```javascript
// Read via the backend API
fetch('/api/products').then(res => res.json())

// Create via the backend API
fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

// Update via the backend API
fetch('/api/products/123', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })

// Delete via the backend API
fetch('/api/products/123', { method: 'DELETE' })
```

---

## 🎯 Next Steps

1. ✅ Install and run locally
2. ✅ Test all pages and features
3. ✅ Update WhatsApp phone number
4. ✅ Customize colors and branding
5. ✅ Add your own products
6. ✅ Deploy to production

---

## 📚 Resources

- React Docs: https://react.dev
- React Router: https://reactrouter.com
- CSS Guide: https://developer.mozilla.org/en-US/docs/Web/CSS
- Unsplash (Free Images): https://unsplash.com

---

## 💡 Tips & Tricks

### Speed Up Development
- Use VS Code with React extension
- Use hot reload (auto-refresh on save)
- Keep DevTools open for debugging

### Performance
- Images are lazy-loaded automatically
- CSS is minified in production
- Use `npm run build` for optimization

### Customization Ideas
- Add reviews section
- Add wishlist feature
- Add user authentication
- Add payment gateway
- Add search functionality

---

## ✨ You're All Set!

Your HAZTO LABEL e-commerce site is ready to go!

```bash
npm start
```

**Enjoy building! 🚀**

*"From Cart to Confidence" - HAZTO LABEL*
