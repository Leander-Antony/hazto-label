const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const PRODUCTS_FILE = path.resolve(__dirname, '..', 'public', 'products.json');

function readProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function writeProducts(data) {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(data, null, 2), 'utf8');
}

app.get('/api/products', (req, res) => {
  const products = readProducts();
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const products = readProducts();
  const newProduct = { ...req.body, id: Date.now() };
  products.push(newProduct);
  writeProducts(products);
  res.status(201).json(newProduct);
});

app.put('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  const products = readProducts();
  const idx = products.findIndex(p => p.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Not found' });
  products[idx] = { ...products[idx], ...req.body };
  writeProducts(products);
  res.json(products[idx]);
});

app.delete('/api/products/:id', (req, res) => {
  const id = Number(req.params.id);
  let products = readProducts();
  const existing = products.find(p => p.id === id);
  if (!existing) return res.status(404).json({ error: 'Not found' });
  products = products.filter(p => p.id !== id);
  writeProducts(products);
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
