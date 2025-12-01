const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const userRoutes = require('./routes/users');
const orderRoutes = require('./routes/orders');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'API is running' });
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

db.initialize();

if (require.main === module) {
  app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
  });
}

module.exports = app;