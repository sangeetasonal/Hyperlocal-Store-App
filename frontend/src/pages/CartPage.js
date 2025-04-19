import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CartPage.css';

const CartPage = ({ cart, setCart }) => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem('cart'));
    if (savedCart) {
      setCart(savedCart);
    }
  }, [setCart]);

  const updateCartStorage = (updatedCart) => {
    setCart(updatedCart);
    sessionStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (productName) => {
    const updatedCart = cart.map(item =>
      item.name === productName ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCartStorage(updatedCart);
  };

  const decreaseQuantity = (productName) => {
    const updatedCart = cart
      .map(item =>
        item.name === productName
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter(item => item.quantity > 0); // Remove item if quantity is 0
    updateCartStorage(updatedCart);
  };

  const removeFromCart = (productName) => {
    const updatedCart = cart.filter(item => item.name !== productName);
    updateCartStorage(updatedCart);
  };

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const placeOrder = () => {
    if (name.trim() === '') {
      alert('Please enter your name');
      return;
    }
    navigate('/order-confirmation', { state: { name } });
    setCart([]);
    sessionStorage.removeItem('cart');
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
                    <div className="quantity-buttons">
                      <button onClick={() => decreaseQuantity(item.name)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => increaseQuantity(item.name)}>+</button>
                    </div>
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
