import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = ({ cart, setCart }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  // Load cart data from sessionStorage when the component mounts
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, [setCart]);

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrder = () => {
    if (name.trim() === '') {
      alert('Please enter your name');
      return;
    }
    navigate('/order-confirmation', { state: { name } });
    setCart([]); // Clear the cart
    sessionStorage.removeItem('cart'); // Remove cart from sessionStorage
  };

  const removeFromCart = (productName) => {
    const updatedCart = cart.filter(item => item.name !== productName);
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart)); 
  };

  return (
    <div className="cart-container">
      <div className="cart-card">
        <h2>Your Cart 🛒</h2>
        {cart.length === 0 ? (
          <p className="empty-message">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-list">
              {cart.map((item, idx) => (
                <li key={idx} className="cart-item">
                  <div>
                    <strong>{item.name}</strong>
                    <p>₹{item.price} × {item.quantity}</p>
                  </div>
                  <button onClick={() => removeFromCart(item.name)}>✖</button>
                </li>
              ))}
            </ul>
            <h3 className="total">Total: ₹{total}</h3>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="name-input"
            />
            <button onClick={placeOrder} className="place-order-btn">
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
