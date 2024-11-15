import React, { useState, useEffect } from 'react';
import { Web3 } from 'web3';
import LoadingSpinner from '../../../components/LoadingSpinner';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  features: string[];
}

const ProductDisplayPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // TODO: Replace with actual API call
        const mockProducts: Product[] = [
          {
            id: '1',
            name: 'Digital Banking Suite',
            description: 'Complete digital banking solution with Web3 integration',
            price: '0.5 ETH',
            features: [
              'Secure wallet integration',
              'Smart contract automation',
              'Cross-chain compatibility',
              '24/7 AI support'
            ]
          },
          // Add more products as needed
        ];
        
        setProducts(mockProducts);
        setLoading(false);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      {loading && <LoadingSpinner />}
      {error && <p>{error}</p>}
      {products.map(product => (
        <div key={product.id}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: {product.price}</p>
          <ul>
            {product.features.map(feature => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProductDisplayPage; 