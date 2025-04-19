const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Import Product model

// Route to fetch products by store name
router.get('/:storeName', async (req, res) => {
  const { storeName } = req.params;

  try {
    // Fetch products from the database by storeName
    const products = await Product.find({ storeName });
    res.json(products); // Send the products as response
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
