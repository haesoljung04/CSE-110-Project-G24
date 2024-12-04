
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
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
  credentials: true // Allow cookies or credentials if needed
}));

// Middleware to handle JSON requests
app.use(express.json());

// Set up MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Test MySQL connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');
});

// Create tables if they do not exist
const createTables = () => {
  const usersTableQuery = `CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    auth0_id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL
  )`;

  const exerciseTableQuery = `CREATE TABLE IF NOT EXISTS exercises (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    name VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  )`;

  const weightTableQuery = `CREATE TABLE IF NOT EXISTS weights (
    id INT AUTO_INCREMENT PRIMARY KEY,
    exercise_id INT,
    weight INT,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (exercise_id) REFERENCES exercises(id) ON DELETE CASCADE
  )`;

  db.query(usersTableQuery, (err) => {
    if (err) throw err;
    console.log('Users table ready');
  });

  db.query(exerciseTableQuery, (err) => {
    if (err) throw err;
    console.log('Exercises table ready');
  });

  db.query(weightTableQuery, (err) => {
    if (err) throw err;
    console.log('Weights table ready');
  });
};

createTables();

// Root route to display a simple message
app.get('/', (req, res) => {
  res.send('Welcome to the Progress Report API');
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

// Route to add a new exercise for a user
app.post('/api/exercises', (req, res) => {
  const { user_id, name } = req.body;
  db.query('INSERT INTO exercises (user_id, name) VALUES (?, ?)', [user_id, name], (err, result) => {
    if (err) {
      console.error('Error adding exercise:', err);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).json({ id: result.insertId, user_id, name });
    }
  });
});

// Route to add a weight entry for an exercise
app.post('/api/weights', (req, res) => {
  const { exercise_id, weight } = req.body;
  db.query('INSERT INTO weights (exercise_id, weight) VALUES (?, ?)', [exercise_id, weight], (err, result) => {
    if (err) {
      console.error('Error adding weight entry:', err);
      res.status(500).send('Internal server error');
    } else {
      res.status(201).json({ id: result.insertId, exercise_id, weight });
    }
  });
});

// Route to get all exercises for a user
app.get('/api/users/:user_id/exercises', (req, res) => {
  const { user_id } = req.params;
  db.query('SELECT * FROM exercises WHERE user_id = ?', [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching exercises:', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(results);
    }
  });
});

// Route to get weight progress for a specific exercise
app.get('/api/exercises/:id/weights', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM weights WHERE exercise_id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error fetching weight progress:', err);
      res.status(500).send('Internal server error');
    } else {
      res.json(results);
    }
  });
});

// Start the server and export the server instance
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export both the app and the database connection
module.exports = { server, db };
