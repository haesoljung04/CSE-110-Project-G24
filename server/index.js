// server/index.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./db'); // Import Sequelize instance
const User = require('./models/User'); // Import User model
const FriendRequest = require('./models/FriendRequest'); // Import FriendRequest model
const friendController = require('./controllers/friendController');


// Initialize dotenv to access environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Enable CORS for all origins (or specify allowed origins)
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the React app's origin
  methods: ['GET', 'POST', 'DELETE', 'PUT'], // Specify allowed HTTP methods
  credentials: true, // Allow cookies or credentials if needed
}));

// Middleware to handle JSON requests
app.use(express.json());

// Test Sequelize connection and sync models
sequelize
  .authenticate()
  .then(() => {
    console.log('Connected to MySQL using Sequelize!');
    return sequelize.sync({ alter: true }); // Sync database schema
  })
  .then(() => {
    console.log('Database synced!');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Example route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

app.post('/add-friend', friendController.sendFriendRequest);
// Route to add or update a user in the database
app.post('/api/users', async (req, res) => {
  try {
    const { auth0_id, name, email } = req.body;

    // Create or update user
    const [user, created] = await User.findOrCreate({
      where: { auth0_id },
      defaults: { name, email },
    });

    if (!created) {
      // Update user if it already exists
      user.name = name;
      user.email = email;
      await user.save();
    }

    res.status(201).send({ message: 'User added or updated', user });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Route to record user actions
app.post('/api/actions', async (req, res) => {
  try {
    const { auth0_id, action_type, action_details } = req.body;

    // Find the user by auth0_id
    const user = await User.findOne({ where: { auth0_id } });
    if (!user) return res.status(404).send({ message: 'User not found' });

    // Record the action (this assumes you have an Action model)
    const action = await sequelize.models.Action.create({
      user_id: user.id,
      action_type,
      action_details,
    });

    res.status(201).send({ message: 'Action recorded', action });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

// Start the server and export the server instance
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = { server, sequelize };