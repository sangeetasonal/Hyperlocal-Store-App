import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import StorePage from '../src/pages/StorePage';
import CartPage from '../src/pages/CartPage';
import HomePage from '../src/pages/HomePage';
import OrderConfirmationPage from '../src/pages/OrderConfirmationPage';

function App() {
  const [cart, setCart] = useState([]); 

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/store/:storeName" element={<StorePage cart={cart} setCart={setCart} />} />
      <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
      <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
    </Routes>
  );
}

export default App;
