const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const fetchFn = global.fetch;

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const PRODUCTS_FILE = path.resolve(__dirname, '..', 'public', 'products.json');
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_PRODUCTS_PATH = process.env.GITHUB_PRODUCTS_PATH || 'public/products.json';

function useGitHubStorage() {
  return Boolean(GITHUB_REPO && GITHUB_TOKEN);
}

async function readProductsFromGitHub() {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_PRODUCTS_PATH}?ref=${encodeURIComponent(GITHUB_BRANCH)}`;
  const res = await fetchFn(url, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  });

  if (!res.ok) {
    throw new Error(`GitHub read failed: ${res.status}`);
  }

  const data = await res.json();
  const content = Buffer.from(data.content, data.encoding || 'base64').toString('utf8');
  return {
    products: JSON.parse(content),
    sha: data.sha
  };
}

async function writeProductsToGitHub(products, sha) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${GITHUB_PRODUCTS_PATH}`;
  const body = {
    message: 'Update products.json from HAZTO admin panel',
    content: Buffer.from(JSON.stringify(products, null, 2), 'utf8').toString('base64'),
    branch: GITHUB_BRANCH
  };

  if (sha) {
    body.sha = sha;
  }

  const res = await fetchFn(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GitHub write failed: ${res.status} ${errorText}`);
  }

  return res.json();
}

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

async function readProductsStore() {
  if (useGitHubStorage()) {
    const result = await readProductsFromGitHub();
    return result;
  }

  return {
    products: readProducts(),
    sha: null
  };
}

async function writeProductsStore(products, sha) {
  if (useGitHubStorage()) {
    return writeProductsToGitHub(products, sha || undefined);
  }

  writeProducts(products);
  return { success: true };
}

app.get('/api/products', async (req, res) => {
  try {
    const { products } = await readProductsStore();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    const { products, sha } = await readProductsStore();
    const newProduct = { ...req.body, id: Date.now() };
    products.push(newProduct);
    await writeProductsStore(products, sha);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { products, sha } = await readProductsStore();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    products[idx] = { ...products[idx], ...req.body };
    await writeProductsStore(products, sha);
    res.json(products[idx]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    let { products, sha } = await readProductsStore();
    const existing = products.find(p => p.id === id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    products = products.filter(p => p.id !== id);
    await writeProductsStore(products, sha);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
