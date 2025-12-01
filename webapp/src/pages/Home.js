import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

function Home({ token }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL + '/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load products');
        setLoading(false);
      });
  }, []);

  const handleAddToCart = (product) => {
    alert('Added ' + product.name + ' to cart!');
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div>
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;