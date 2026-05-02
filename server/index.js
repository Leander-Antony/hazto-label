const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const PRODUCTS_FILE = path.resolve(__dirname, '..', 'public', 'products.json');
const TURSO_DATABASE_URL = process.env.TURSO_DATABASE_URL;
const TURSO_AUTH_TOKEN = process.env.TURSO_AUTH_TOKEN;

let turso = null;
let initPromise = null;

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

function useTursoStorage() {
  return Boolean(TURSO_DATABASE_URL && TURSO_AUTH_TOKEN);
}

async function ensureTursoClient() {
  if (turso || !useTursoStorage()) {
    return turso;
  }

  const { createClient } = await import('@tursodatabase/serverless/compat');
  turso = createClient({
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN
  });

  return turso;
}

async function initializeTurso() {
  const client = await ensureTursoClient();
  if (!client) {
    return;
  }

  await client.execute(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY,
      data TEXT NOT NULL
    )
  `);

  const countResult = await client.execute('SELECT COUNT(*) AS count FROM products');
  const existingCount = Number(countResult.rows?.[0]?.count || 0);

  if (existingCount === 0) {
    const seedProducts = readProducts();
    if (seedProducts.length > 0) {
      await client.batch(
        seedProducts.map(product => ({
          sql: 'INSERT INTO products (id, data) VALUES (?, ?)',
          args: [product.id, JSON.stringify(product)]
        })),
        'write'
      );
    }
  }
}

function ensureInitialized() {
  if (!initPromise) {
    initPromise = initializeTurso();
  }
  return initPromise;
}

async function readProductsStore() {
  if (!useTursoStorage()) {
    return { products: readProducts() };
  }

  await ensureInitialized();
  const client = await ensureTursoClient();
  const result = await client.execute('SELECT data FROM products ORDER BY id ASC');
  return {
    products: result.rows.map(row => JSON.parse(row.data))
  };
}

async function readProductById(id) {
  if (!useTursoStorage()) {
    return readProducts().find(product => product.id === id) || null;
  }

  await ensureInitialized();
  const client = await ensureTursoClient();
  const result = await client.execute({
    sql: 'SELECT data FROM products WHERE id = ?',
    args: [id]
  });

  if (!result.rows.length) {
    return null;
  }

  return JSON.parse(result.rows[0].data);
}

async function writeProductsStore(products) {
  if (!useTursoStorage()) {
    writeProducts(products);
    return { success: true };
  }

  await ensureInitialized();
  const client = await ensureTursoClient();
  await client.execute('DELETE FROM products');

  if (products.length > 0) {
    await client.batch(
      products.map(product => ({
        sql: 'INSERT INTO products (id, data) VALUES (?, ?)',
        args: [product.id, JSON.stringify(product)]
      })),
      'write'
    );
  }

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
    const { products } = await readProductsStore();
    const newProduct = { ...req.body, id: Date.now() };
    products.push(newProduct);
    await writeProductsStore(products);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    const { products } = await readProductsStore();
    const idx = products.findIndex(p => p.id === id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    const updatedProduct = { ...products[idx], ...req.body, id };
    products[idx] = updatedProduct;
    await writeProductsStore(products);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    let { products } = await readProductsStore();
    const existing = products.find(p => p.id === id);
    if (!existing) return res.status(404).json({ error: 'Not found' });
    products = products.filter(p => p.id !== id);
    await writeProductsStore(products);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

if (require.main === module) {
  const start = async () => {
    try {
      await ensureInitialized();
      app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('Failed to start server:', error);
      process.exit(1);
    }
  };

  start();
}

module.exports = app;
