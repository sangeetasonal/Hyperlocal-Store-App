import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const [stores, setStores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://hyperlocal-store-app-9te6.onrender.com/stores')
      .then(res => res.json())
      .then(data => setStores(data));
  }, []);

  return (
    <div className="home-container">
      <h1>Hyperlocal Stores</h1>
      <ul className="store-list">
        {stores.map((store, idx) => (
          <li key={idx} onClick={() => navigate(`/store/${store.name}`)}>
            <strong>{store.name}</strong> ({store.location})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
