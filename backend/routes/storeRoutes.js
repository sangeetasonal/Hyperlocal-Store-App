const express = require('express');
const router = express.Router();
const Store = require('../models/Store'); // Import Store model

// Route to fetch all stores
router.get('/', async (req, res) => {
  try {
    // Fetch all stores from the database
    const stores = await Store.find();
    res.json(stores); // Send the stores as response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
