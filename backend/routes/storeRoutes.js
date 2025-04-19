const express = require('express');
const router = express.Router();
const stores = require('../sample-data/stores.json');

router.get('/', (req, res) => {
  res.json(stores);
});

module.exports = router;
