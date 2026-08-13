const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const admin = require('firebase-admin');

require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const PRODUCTS_FILE = path.resolve(__dirname, '..', 'public', 'products.json');
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_CLIENT_EMAIL = process.env.FIREBASE_CLIENT_EMAIL;
const FIREBASE_PRIVATE_KEY = process.env.FIREBASE_PRIVATE_KEY;

// Log environment setup (but never log private keys)
console.log('[SERVER] Environment Variables Loaded:');
console.log('  - PORT:', PORT);
console.log('  - FIREBASE_PROJECT_ID:', FIREBASE_PROJECT_ID || 'NOT SET');
console.log('  - FIREBASE_CLIENT_EMAIL:', FIREBASE_CLIENT_EMAIL || 'NOT SET');
console.log('  - FIREBASE_PRIVATE_KEY:', FIREBASE_PRIVATE_KEY ? 'SET (length: ' + FIREBASE_PRIVATE_KEY.length + ')' : 'NOT SET');

let firestore = null;
let initPromise = null;

function readSeedProducts() {
  try {
    const raw = fs.readFileSync(PRODUCTS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (e) {
    return [];
  }
}

function ensureFirestoreClient() {
  if (firestore) {
    return firestore;
  }

  try {
    if (!admin.apps.length) {
      if (FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
        console.log('[Firestore] Initializing with service account credentials...');
        admin.initializeApp({
          credential: admin.credential.cert({
            projectId: FIREBASE_PROJECT_ID,
            clientEmail: FIREBASE_CLIENT_EMAIL,
            privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
          })
        });
        console.log('[Firestore] ✓ Initialized with service account.');
      } else {
        console.log('[Firestore] WARNING: Using default credentials (FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY not set)');
        admin.initializeApp();
      }
    }

    firestore = admin.firestore();
    firestore.settings({ ignoreUndefinedProperties: true });
    console.log('[Firestore] ✓ Firestore client created.');
    return firestore;
  } catch (err) {
    console.error('[Firestore] ERROR initializing:', err.message);
    throw err;
  }
}

function ensureInitialized() {
  if (!initPromise) {
    initPromise = initializeFirestore();
  }
  return initPromise;
}

async function initializeFirestore() {
  try {
    const db = ensureFirestoreClient();
    console.log('[Firestore] Checking if products collection exists...');
    const snapshot = await db.collection('products').limit(1).get();

    if (!snapshot.empty) {
      console.log('[Firestore] Products collection already has data.');
      return;
    }
    console.log('[Firestore] Products collection is empty, seeding from products.json...');

  const seedProducts = readSeedProducts();
  if (seedProducts.length === 0) {
    return;
  }

    const batch = db.batch();
    for (const product of seedProducts) {
      const docRef = db.collection('products').doc(String(product.id));
      batch.set(docRef, product);
    }

    await batch.commit();
    console.log(`[Firestore] Successfully seeded ${seedProducts.length} products to Firestore.`);
  } catch (err) {
    console.error('[Firestore] Error during initialization:', err.message);
    throw err;
  }
}

async function readProductsStore() {
  await ensureInitialized();
  const db = ensureFirestoreClient();
  try {
    const result = await db.collection('products').orderBy('id', 'asc').get();
    console.log(`[Firestore] Read ${result.docs.length} products from Firestore.`);
    return {
      products: result.docs.map(doc => doc.data())
    };
  } catch (err) {
    console.error('[Firestore] Error reading products:', err.message);
    throw err;
  }
}

async function readProductById(id) {
  await ensureInitialized();
  const db = ensureFirestoreClient();
  const doc = await db.collection('products').doc(String(id)).get();

  if (!doc.exists) {
    return null;
  }

  return doc.data();
}

app.get('/api/products', async (req, res) => {
  try {
    const { products } = await readProductsStore();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Failed to read products' });
  }
});

const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: No token provided' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ error: 'Forbidden: Invalid token' });
  }
  next();
};

app.post('/api/products', authenticateAdmin, async (req, res) => {
  try {
    console.log('[API] POST /api/products - body:', JSON.stringify(req.body).slice(0,200));
    await ensureInitialized();
    const db = ensureFirestoreClient();
    const newProduct = { ...req.body, id: Date.now() };
    await db.collection('products').doc(String(newProduct.id)).set(newProduct);
    console.log(`[API] Created product id=${newProduct.id}`);
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log(`[API] PUT /api/products/${id} - body:`, JSON.stringify(req.body).slice(0,200));
    const existingProduct = await readProductById(id);
    if (!existingProduct) return res.status(404).json({ error: 'Not found' });
    const updatedProduct = { ...existingProduct, ...req.body, id };
    await ensureInitialized();
    const db = ensureFirestoreClient();
    await db.collection('products').doc(String(id)).set(updatedProduct);
    console.log(`[API] Updated product id=${id}`);
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', authenticateAdmin, async (req, res) => {
  try {
    const id = Number(req.params.id);
    console.log(`[API] DELETE /api/products/${id}`);
    const existing = await readProductById(id);
    if (!existing) {
      console.log(`[API] DELETE id=${id} not found`);
      return res.status(404).json({ error: 'Not found' });
    }
    await ensureInitialized();
    const db = ensureFirestoreClient();
    await db.collection('products').doc(String(id)).delete();
    console.log(`[API] Deleted product id=${id}`);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

if (require.main === module) {
  const start = async () => {
    try {
      console.log('[SERVER] Starting server...');
      await ensureInitialized();
      console.log('[SERVER] ✓ Firestore initialized.');
      app.listen(PORT, () => {
        console.log(`[SERVER] ✓ Server running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.error('[SERVER] ERROR - Failed to start server:', error.message);
      console.error(error);
      process.exit(1);
    }
  };

  start();
}

module.exports = app;
