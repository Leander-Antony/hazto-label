# HAZTO LABEL - Aesthetic Clothing Brand Website

A modern, responsive React-based e-commerce website for HAZTO LABEL with the tagline **"From Cart to Confidence"**.

## 🌑 Features

### Global Design
- **Streetwear Brutalist Aesthetic**: Stark black and white with vibrant pale peach/lilac accents.
- **Dynamic Marquees**: Infinitely scrolling text for a hyped streetwear feel.
- **Modern Typography**: Massive Anton headings + Space Grotesk body text.
- **Sharp Edges & Harsh Shadows**: Authentic Y2K/Depop visual style.
- **App-Like Details**: Fixed-screen, no-scroll product detail pages.

### Pages & Features

#### 🏠 Home Page
- **Hero Section**: Brutalist marquee scrolling text with solid borders.
- **Shop by Mood**: Browse by aesthetic categories (Dark, Vintage, Street)
- **Featured Products**: Rigid grid with fixed-ratio product cards.
- **Editorial Section**: Fashion storytelling with brutalist layout.
- **Community Section**: Instagram-style user photo grid.

#### 🛍 Product Listing
- **Advanced Filters**: Sticky brutalist sidebar filter.
- **Rigid Grid**: Responsive product cards with fixed 4:5 image ratios.
- **Hover Effects**: Acid green/lilac accents on hover.
- **Add to Cart**: Direct from listing.

#### 📄 Product Detail Page
- **App-Like Fixed Layout**: Fits perfectly on screen without page scrolling.
- **Scrollable Details Pane**: Industrial data-grid styling for product info.
- **Size & Quantity Selectors**: Brutalist form controls.
- **WhatsApp Integration**: Pre-filled order messages.
- **"You May Also Like"**: Related product suggestions in details pane.

#### 🛒 Shopping Cart
- **Order Summary**: Item list with images and prices
- **Quantity Management**: Add/remove items easily
- **Total Price Calculation**: Real-time updates
- **WhatsApp Checkout**: Send full cart details to WhatsApp

#### ⚙️ Admin Panel
**Access**: `/admin`

**Features**:
- **Add Products**: Create new items with all details
- **Edit Products**: Modify existing products
- **Delete Products**: Remove items from catalog
- **Persistent Storage**: Changes saved to Firestore via the API

### State Management
- **React Context API**: For cart and product management
- **Firestore**: Persistent product storage across sessions
- **Mock Data**: Pre-populated product database

### WhatsApp Integration
- Pre-filled message format with product details
- Cart summary messages
- Replace phone number in:
  - `src/pages/ProductDetail.js` (line: `const WHATSAPP_PHONE = '919876543210'`)
  - `src/pages/Cart.js` (line: `const WHATSAPP_PHONE = '919876543210'`)

## 📁 Project Structure

```
hazto-label/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Hero.js
│   │   ├── ProductCard.js
│   │   ├── ShopByMood.js
│   │   ├── FeaturedProducts.js
│   │   ├── Editorial.js
│   │   └── Community.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Products.js
│   │   ├── ProductDetail.js
│   │   ├── Cart.js
│   │   └── AdminPanel.js
│   ├── data/
│   │   └── mockData.js
│   ├── styles/
│   │   ├── global.css
│   │   ├── navbar.css
│   │   ├── hero.css
│   │   ├── product-card.css
│   │   ├── shop-by-mood.css
│   │   ├── featured-products.css
│   │   ├── editorial.css
│   │   ├── community.css
│   │   ├── products-page.css
│   │   ├── product-detail.css
│   │   ├── cart-page.css
│   │   └── admin-panel.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to project directory**:
   ```bash
   cd d:\Desktop\_\Git\hazto-label
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm start
   ```

   The app will open at `http://localhost:3000`

### Build for Production
```bash
npm build
```

## 🎨 Customization

### Update WhatsApp Number
Edit these files and replace the phone number:
- `src/pages/ProductDetail.js`
- `src/pages/Cart.js`

Replace:
```javascript
const WHATSAPP_PHONE = '919876543210'; // Your WhatsApp number
```

### Add Products
1. Go to `/admin`
2. Click "Add New Product"
3. Fill in product details
4. Click "Add Product"

Products are automatically saved to Firestore and appear instantly across the site.

### Customize Colors
Edit `src/styles/global.css` CSS variables:
```css
:root {
  --primary-dark: #111111;
  --primary-light: #fae4cc;
  --accent-color: #d1b3ff;
  /* ... other colors */
}
```

## 📊 Sample Data

The app includes 12 pre-loaded products across:
- **Categories**: jerseys, Over sized, pants
- **Moods**: Dark, Vintage, Street

View in `src/data/mockData.js`

## 🧪 Testing

### Manual Testing Checklist
- [ ] Navigate between all pages
- [ ] Filter products by mood and category
- [ ] Add items to cart
- [ ] Modify cart quantities
- [ ] Test WhatsApp integration
- [ ] Add/edit/delete products in admin panel
- [ ] Test responsive design on mobile

### Firestore
- **Collection**: `products`
- **Seed data**: Loaded automatically from `public/products.json` on first run

Use the Firebase console to inspect or clear product records.

## 🌐 Deployment

### Netlify / Vercel
1. Build the project: `npm build`
2. Deploy the `build` folder
3. Set environment variables if needed

### GitHub Pages
```bash
npm install --save-dev gh-pages
```

Add to `package.json`:
```json
"homepage": "https://yourusername.github.io/hazto-label",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

## 🔧 Technologies Used

- **React** 18.2.0
- **React Router** 6.11.0
- **Lucide Icons** for beautiful SVG icons
- **Pure CSS** for styling (no frameworks)
- **Firestore** for product persistence

## 📝 Notes

- **Backend API**: Product data stored in Firestore through the Express server
- **Mock Images**: Uses Unsplash for product images
- **Responsive**: Tested on mobile, tablet, and desktop
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🚨 Important

1. **Update WhatsApp Phone Number** before deploying
2. **Update Product Images** with your actual images
3. **Customize Brand Details** as needed
4. **Test on Multiple Devices** before launch

## 📞 Support

For WhatsApp integration issues, ensure:
- Phone number includes country code (e.g., +91 for India)
- Message encoding is correct
- WhatsApp is installed on the target device

## 📄 License

This project is created for HAZTO LABEL.

---

**Build with confidence. Ship with pride. 🎯**

*"From Cart to Confidence" - HAZTO LABEL*
