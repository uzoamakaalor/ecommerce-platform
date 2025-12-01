const express = require('express');
const { getDb } = require('../database');

const router = express.Router();

router.get('/', (req, res) => {
  const db = getDb();
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
});

router.get('/:id', (req, res) => {
  const db = getDb();
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

router.post('/', (req, res) => {
  const { name, description, price, stock } = req.body;
  if (!name || !price) {
    return res.status(400).json({ error: 'Name and price are required' });
  }
  const db = getDb();
  const result = db.prepare('INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)').run(name, description || '', price, stock || 0);
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(product);
});

router.delete('/:id', (req, res) => {
  const db = getDb();
  const result = db.prepare('DELETE FROM products WHERE id = ?').run(req.params.id);
  if (result.changes === 0) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json({ message: 'Product deleted' });
});

module.exports = router;