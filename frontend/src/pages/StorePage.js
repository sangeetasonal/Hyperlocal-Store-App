import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './StorePage.css';

const StorePage = ({ cart, setCart }) => {
  const { storeName } = useParams();
  const [products, setProducts] = useState([]);
  const [showMessage, setShowMessage] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://hyperlocal-store-app-9te6.onrender.com/api/products/${storeName}`)
      .then(res => res.json())
      .then(data => setProducts(data));

    // Load the cart from sessionStorage on page load
    const savedCart = JSON.parse(sessionStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, [storeName, setCart]);

  // Save the cart to sessionStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      sessionStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (product) => {
    if (typeof setCart !== 'function') return;

    // price and quantity  when adding to the cart
    const productWithValidData = {
      ...product,
      price: Number(product.price), 
      quantity: 1, 
    };

    setCart(prevCart => {
      const existing = prevCart.find(p => p.name === product.name);
      if (existing) {
        // If the product already exists, update the quantity
        return prevCart.map(p =>
          p.name === product.name ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        // If the product is not in the cart, add it
        return [...prevCart, productWithValidData];
      }
    });

    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  };

  return (
    <div className="store-container">
      <h2>{storeName} - Products</h2>
      <div className="product-list">
        {products.map(product => (
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
