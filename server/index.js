// server/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');

// Initialize dotenv to access environment variables
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

// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost', // Replace with process.env.DB_HOST
  user: 'root',      // Replace with process.env.DB_USER
  password: 'fine666666', // Replace with process.env.DB_PASSWORD
  database: 'mydatabase',
});
console.log(process.env);
// Test MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

// Example route
app.get('/api', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

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




// API to fetch workouts for a user
app.get('/api/workouts/:user_id', (req, res) => {
  const { user_id } = req.params;
  const sql = 'SELECT * FROM workouts WHERE user_id = ?';
  db.query(sql, [user_id], (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// API to add a workout
app.post('/api/workouts', (req, res) => {
  const { workoutName, sets, reps, weight, maxOutWeight, user_id } = req.body;
  const sql = `INSERT INTO workouts (workoutName, sets, reps, weight, maxOutWeight, user_id) VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [workoutName, sets, reps, weight, maxOutWeight, user_id], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).send({ id: result.insertId, message: 'Workout added' });
  });
});

// API to update a workout
app.put('/api/workouts/:id', (req, res) => {
  const { id } = req.params;
  const { workoutName, sets, reps, weight, maxOutWeight, user_id } = req.body;
  const sql = `UPDATE workouts SET workoutName = ?, sets = ?, reps = ?, weight = ?, maxOutWeight = ? WHERE id = ? AND user_id = ?`;
  db.query(sql, [workoutName, sets, reps, weight, maxOutWeight, id, user_id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Workout updated' });
  });
});

// API to delete a workout
app.delete('/api/workouts/:id/:user_id', (req, res) => {
  const { id, user_id } = req.params;
  const sql = `DELETE FROM workouts WHERE id = ? AND user_id = ?`;
  db.query(sql, [id, user_id], (err) => {
    if (err) return res.status(500).send(err);
    res.send({ message: 'Workout deleted' });
  });
});

// Start the server
// Start the server and export the server instance
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Export both the app and the database connection
module.exports = { server, db };