const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Hyperlocal Store API 🎉');
});

// Routes
app.use('/api/stores', require('./routes/storeRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running at: http://localhost:${PORT}/`);
});
