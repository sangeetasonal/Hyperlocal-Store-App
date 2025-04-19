const express = require('express');
const router = express.Router();
const products = require('../sample-data/products.json');

router.get('/:storeName', (req, res) => {
  const { storeName } = req.params;
  const filtered = products.filter(p => p.storeName === storeName);
  res.json(filtered);
});

module.exports = router;
