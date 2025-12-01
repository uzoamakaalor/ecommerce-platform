const express = require('express');
const jwt = require('jsonwebtoken');
const { getDb } = require('../database');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'No token provided' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
}

router.get('/', authenticate, (req, res) => {
  const db = getDb();
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC').all(req.userId);
  res.json(orders);
});

router.post('/', authenticate, (req, res) => {
  const { items } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Items are required' });
  }
  const db = getDb();
  let total = 0;
  const productDetails = [];
  for (const item of items) {
    const product = db.prepare('SELECT * FROM products WHERE id = ?').get(item.productId);
    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }
    total += product.price * item.quantity;
    productDetails.push({ product, quantity: item.quantity });
  }
  const orderResult = db.prepare('INSERT INTO orders (user_id, total) VALUES (?, ?)').run(req.userId, total);
  const orderId = orderResult.lastInsertRowid;
  for (const detail of productDetails) {
    db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)').run(orderId, detail.product.id, detail.quantity, detail.product.price);
  }
  const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
  res.status(201).json(order);
});

module.exports = router;