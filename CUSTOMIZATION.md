# HAZTO LABEL - Configuration Guide

## 🎨 Customization Reference

This guide explains how to customize HAZTO LABEL to match your brand.

---

## 🌈 Colors & Theme

### Edit Global Colors
**File**: `src/styles/global.css`

```css
:root {
  --primary-dark: #0a0a0a;           /* Main text, buttons */
  --primary-light: #f5f5f5;           /* Background, light sections */
  --accent-beige: #d4c5b9;            /* Highlights, hover states */
  --accent-gray: #2a2a2a;             /* Secondary dark tones */
  --border-light: #e0e0e0;            /* Borders, dividers */
  --text-primary: #1a1a1a;            /* Body text */
  --text-secondary: #666666;          /* Meta text, descriptions */
  --shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 20px 50px rgba(0, 0, 0, 0.15);
}
```

### Color Theme Examples

**Modern Dark**:
```css
--primary-dark: #1a1a1a;
--accent-beige: #e8d4c0;
```

**Classic Monochrome**:
```css
--primary-dark: #000000;
--accent-beige: #808080;
```

**Warm Tones**:
```css
--primary-dark: #2c1810;
--accent-beige: #d4a574;
```

---

## 🔤 Typography

### Fonts Used
- **Display**: Playfair Display (serif) - headlines
- **Body**: Inter (sans-serif) - text

### Change Fonts
**File**: `public/index.html`

Replace Google Fonts import (line 8):
```html
<!-- Current -->
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<!-- Alternative: Lora + Roboto -->
<link href="https://fonts.googleapis.com/css2?family=Lora:wght@400;600;700&family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet">

<!-- Alternative: Georgia + Open Sans -->
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet">
```

Then update CSS (in each component's style file):
```css
h1, h2, h3, h4 {
  font-family: 'Lora', serif;  /* Change heading font */
}

body {
  font-family: 'Roboto', sans-serif;  /* Change body font */
}
```

### Font Sizes
Edit in `src/styles/global.css`:
```css
h1 { font-size: 3.5rem; }   /* Largest headings */
h2 { font-size: 2.5rem; }   /* Section titles */
h3 { font-size: 1.5rem; }   /* Card titles */
```

---

## 🛍️ Brand Identity

### Logo/Brand Name
**File**: `src/components/Navbar.js`

```javascript
<Link to="/" className="navbar-logo">
  <span className="logo-text">HAZTO</span>
  <span className="logo-label">LABEL</span>
</Link>
```

Change to:
```javascript
<Link to="/" className="navbar-logo">
  <span className="logo-text">YOUR BRAND</span>
  <span className="logo-label">NAME</span>
</Link>
```

### Tagline
**File**: `src/components/Hero.js`

```javascript
<p className="hero-tagline">From Cart to Confidence</p>
```

Change to your tagline:
```javascript
<p className="hero-tagline">Your Custom Tagline</p>
```

### Page Title
**File**: `public/index.html`

```html
<title>HAZTO LABEL - From Cart to Confidence</title>
```

Change to:
```html
<title>Your Brand Name - Your Tagline</title>
```

---

## 📦 Product Categories & Moods

### Available Categories
**File**: `src/data/mockData.js`

```javascript
export const categories = ["jerseys", "Over sized", "pants"];
```


### Available Moods
**File**: `src/data/mockData.js`

```javascript
export const moods = ["Dark", "Vintage", "Street"];
```

Customize:
```javascript
export const moods = ["Minimalist", "Bold", "Classic", "Trendy"];
```

Update product mood in `mockData.js`:
```javascript
{
  id: 1,
  name: "Soft Linen T-Shirt",
  mood: "Minimalist",  // Changed from "Soft"
  // ... rest of product data
}
```

---

## 📸 Media & Images

### Hero Section Video
**File**: `src/components/Hero.js`

```javascript
<video autoPlay muted loop playsInline>
  <source 
    src="https://videos.pexels.com/video-files/3571904/3571904-sd_640_360_25fps.mp4" 
    type="video/mp4"
  />
</video>
```

Use your own video:
```javascript
<source src="https://your-cdn.com/your-video.mp4" type="video/mp4" />
```

### Community Photos
**File**: `src/data/mockData.js`

```javascript
export const communityPhotos = [
  "https://images.unsplash.com/photo-1519634593620-f5e130dcd551?w=300&h=300&fit=crop",
  // ... 8 more photos
];
```

Replace with your Instagram/User photos:
```javascript
export const communityPhotos = [
  "https://your-cdn.com/photo1.jpg",
  "https://your-cdn.com/photo2.jpg",
  // ... add more
];
```

---

## 💬 WhatsApp Integration

### Update Phone Number
**Files to edit**:
1. `src/pages/ProductDetail.js` (line ~11)
2. `src/pages/Cart.js` (line ~7)

```javascript
const WHATSAPP_PHONE = '919876543210';  // Change this
```

### Phone Number Format
| Country | Code | Example |
|---------|------|---------|
| India | 91 | 919876543210 |
| USA | 1 | 12025551234 |
| UK | 44 | 442071838750 |
| Brazil | 55 | 5511987654321 |

### Customize Messages
**Product Detail**: `src/pages/ProductDetail.js` (line ~81)
```javascript
const message = `Hi, I'm interested in:\n\nProduct: ${product.name}...`;
// Customize the message format here
```

**Cart**: `src/pages/Cart.js` (line ~25)
```javascript
let cartMessage = 'Hi, I want to order:\n\n';
// Customize the cart message format here
```

---

## 🎯 Shop by Mood Section

### Customize Mood Cards
**File**: `src/components/ShopByMood.js`

```javascript
const moodData = [
  {
    mood: 'Dark',
    image: 'https://images.unsplash.com/photo-1503342217505-b57375b546d1?w=400&h=400&fit=crop',
    description: 'Bold & mysterious'
  },
  // ... more moods
];
```

Customize or add moods:
```javascript
const moodData = [
  {
    mood: 'YourMood',
    image: 'https://your-image-url.com/image.jpg',
    description: 'Your description here'
  },
];
```

---

## 📝 Editorial Content

### Featured Blog Posts
**File**: `src/data/mockData.js`

```javascript
export const editorialContent = [
  {
    id: 1,
    title: "The Art of Minimalist Dressing",
    description: "Discover how less can truly be more...",
    image: "https://images.unsplash.com/...",
    author: "Sarah Chen",
    date: "May 2024"
  },
  // ... more articles
];
```

Add your blog content:
```javascript
export const editorialContent = [
  {
    id: 3,
    title: "Your Article Title",
    description: "Your article description here...",
    image: "https://your-image-url.com/image.jpg",
    author: "Your Name",
    date: "Month Year"
  },
];
```

---

## 🔘 Button Styling

### Primary Button Colors
**File**: `src/styles/global.css`

```css
.btn-primary {
  background-color: var(--primary-dark);
  color: var(--primary-light);
}

.btn-primary:hover {
  background-color: var(--accent-gray);
}
```

### WhatsApp Button
**File**: `src/styles/global.css`

```css
.btn-whatsapp {
  background-color: #25d366;
  color: white;
}

.btn-whatsapp:hover {
  background-color: #1da853;
}
```

Change to custom color:
```css
.btn-whatsapp {
  background-color: #your-color;
  color: white;
}
```

---

## 🏗️ Layout & Spacing

### Section Padding
**File**: `src/styles/global.css`

```css
section {
  padding: 80px 20px;  /* Change this */
}
```

Adjust spacing:
```css
section {
  padding: 100px 20px;  /* Larger padding */
}
```

### Grid Gaps
**File**: `src/styles/featured-products.css`

```css
.featured-grid {
  gap: 30px;  /* Space between items */
}
```

Make grid denser:
```css
.featured-grid {
  gap: 20px;  /* Smaller gap */
}
```

---

## 🎭 Animations

### Enable/Disable Animations
**File**: `src/styles/global.css`

Remove animation classes to disable:
```css
/* Comment out to disable */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
```

### Animation Duration
Adjust timing:
```css
.product-card {
  animation: fadeIn 0.6s ease-out;  /* Change 0.6s to your duration */
}
```

---

## 🔍 SEO & Meta

### Meta Tags
**File**: `public/index.html`

Add after `<title>`:
```html
<meta name="description" content="Your brand description for search engines">
<meta name="keywords" content="clothing, fashion, aesthetic">
<meta name="author" content="Your Name">
<meta property="og:title" content="HAZTO LABEL">
<meta property="og:description" content="From Cart to Confidence">
<meta property="og:image" content="https://your-image-url.jpg">
```

---

## 💾 Firestore Configuration

### Collection
Current collection used:
- `products` - Product database

### Clear Storage Programmatically
Delete product records from Firestore using the Firebase console or the backend API.

---

## 📋 Quick Reference Checklist

- [ ] Update brand name and tagline
- [ ] Change color scheme
- [ ] Update WhatsApp phone number
- [ ] Add/customize product categories
- [ ] Update hero video
- [ ] Add community photos
- [ ] Customize mood categories
- [ ] Add blog/editorial content
- [ ] Update meta tags for SEO
- [ ] Test on mobile devices
- [ ] Deploy to production

---

## 🚀 Advanced Customizations

### Add New Page
1. Create file in `src/pages/YourPage.js`
2. Add route in `src/App.js`
3. Create corresponding CSS in `src/styles/`

### Add Newsletter
```javascript
// In Hero or footer
const [email, setEmail] = useState('');
const handleSubscribe = () => {
  // Store newsletter signups in your preferred backend or analytics tool
};
```

### Add Search
```javascript
// Filter products by name
const filtered = products.filter(p => 
  p.name.toLowerCase().includes(query.toLowerCase())
);
```

---

## ❓ FAQ

**Q: Can I use different fonts?**
A: Yes, update Google Fonts import in `public/index.html` and CSS files.

**Q: How do I change the header layout?**
A: Edit `src/components/Navbar.js` and `src/styles/navbar.css`.

**Q: Can I add more products manually?**
A: Yes, edit `src/data/mockData.js` or use the admin panel at `/admin`.

**Q: How do I change grid layout?**
A: Edit `grid-template-columns` in CSS files for each section.

**Q: Can I use video instead of images?**
A: Yes, update image URLs to video URLs in product data.

---

## 💡 Pro Tips

1. **Use CSS custom properties** for consistent theming
2. **Test on mobile** after each customization
3. **Keep backups** of original files
4. **Use browser DevTools** to test CSS changes live
5. **Compress images** before uploading to CDN

---

**Happy Customizing! 🎨**

*"From Cart to Confidence" - HAZTO LABEL*
