import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StorePage.css';

const StorePage = ({ cart, setCart }) => {
  const { storeName } = useParams();
  const [products, setProducts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://hyperlocal-store-app-9te6.onrender.com/products/${storeName}`)
      .then(res => res.json())
      .then(data => setProducts(data));

    const savedCart = JSON.parse(sessionStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, [storeName, setCart]);

  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    if (typeof setCart !== 'function') return;

    const productWithValidData = {
      ...product,
      price: Number(product.price),
      quantity: 1,
    };

    setCart(prevCart => {
      const existing = prevCart.find(p => p.name === product.name);
      if (existing) {
        return prevCart.map(p =>
          p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, productWithValidData];
      }
    });

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  const filteredProducts = searchTerm.trim() === ''
    ? products
    : products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    <div className="store-container">
      <div className="top-bar">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <h2>{storeName} - Products</h2>

      <div className="product-list">
        {filteredProducts.map(product => (
          <div key={product.name} className="product-card">
            <h3>{product.name}</h3>
            <p>₹{product.price}</p>
            <button onClick={() => addToCart(product)}>Add to Cart</button>
          </div>
        ))}
      </div>

      <button className="view-cart" onClick={() => navigate('/cart')}>View Cart</button>

      {showMessage && (
        <div className="cart-message">Item added to cart!</div>
      )}
    </div>
  );
};

export default StorePage;
