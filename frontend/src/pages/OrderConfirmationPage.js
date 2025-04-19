import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OrderConfirmationPage.css';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userName = location.state?.name || 'Customer';

  return (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <h2>Thank you, {userName}!</h2>
        <p>Your order has been placed successfully. 🎉</p>
        <button onClick={() => navigate('/')}>Go Back to Home</button>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
