const request = require('supertest');
const app = require('../src/server');

describe('API Endpoints', () => {
  describe('GET /health', () => {
    it('should return health status', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
      expect(res.body.status).toBe('OK');
    });
  });

  describe('GET /api/products', () => {
    it('should return all products', async () => {
      const res = await request(app).get('/api/products');
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/products', () => {
    it('should create a new product', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ name: 'Test Product', price: 29.99, stock: 10 });
      expect(res.statusCode).toBe(201);
      expect(res.body.name).toBe('Test Product');
    });
  });
});