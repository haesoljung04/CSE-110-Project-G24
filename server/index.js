// server/index.js
const express = require('express');
const cors = require('cors');
const workoutRoutineDisplayRoute = require("./routes/workoutRoutineDisplayRoute");
const friendAllRoute = require('./routes/friendAllRoute');
const friendBlockedRoute = require('./routes/friendBlockedRoute');
const workoutRoute = require("./routes/workoutRoute");
const db = require('./db'); // Import only the `db` property
const dotenv = require('dotenv');


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;


// Enable CORS for all origins (or specify allowed origins)
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the React app's origin
  methods: ['GET', 'POST', 'DELETE', 'PUT'],         // Specify allowed HTTP methods
  credentials: true                 // Allow cookies or credentials if needed
}));

// Middleware to handle JSON requests
app.use(express.json());


// Routes for profle and checkin
const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profile', profileRoutes);

const checkinRoutes = require('./routes/checkinRoutes');

app.use('/api/checkin', checkinRoutes);

// Friends page - All friends
app.use('/api/friends', friendAllRoute(db));
// Friends page - Blocked friends
app.use('/api/friends/blocked', friendBlockedRoute(db));

// workout routine display route
app.use("/api/workout", workoutRoutineDisplayRoute(db));

// workout choose and save route
app.use("/api/workouts", workoutRoute(db));


// Route to add or update a user in the database
app.post('/api/users', (req, res) => {
  const { auth0_id, name, email } = req.body;
  const sql = `INSERT INTO users (auth0_id, name, email) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE name=?, email=?`;
  db.query(sql, [auth0_id, name, email, name, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'User added or updated', id: result.insertId });
  });
});

// Route to record user actions
app.post('/api/actions', (req, res) => {
  const { auth0_id, action_type, action_details } = req.body;
  const sqlUser = 'SELECT id FROM users WHERE auth0_id = ?';
  db.query(sqlUser, [auth0_id], (err, results) => {
    if (err) return res.status(500).send(err);
    if (results.length === 0) return res.status(404).send({ message: 'User not found' });

    const user_id = results[0].id;
    const sqlAction = 'INSERT INTO actions (user_id, action_type, action_details) VALUES (?, ?, ?)';
    db.query(sqlAction, [user_id, action_type, action_details], (err) => {
      if (err) return res.status(500).send(err);
      res.send({ message: 'Action recorded' });
    });
  });
});

// Start the server and export the server instance
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Export both the app and the database connection
module.exports = server;
