const express = require('express');
const dotenv = require('dotenv');
const profileRoutes = require('./routes/profileRoutes');
const checkinRoutes = require('./routes/checkinRoutes');

dotenv.config(); // Load .env variables
const app = express();

app.use(express.json());

// Routes
app.use('/api/profile', profileRoutes);
app.use('/api/checkin', checkinRoutes);

// Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});