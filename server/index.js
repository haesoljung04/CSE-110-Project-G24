// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all origins (or configure it specifically)
app.use(cors());

// Middleware to handle JSON requests
app.use(express.json());

// Example route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
