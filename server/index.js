// server/index.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const dotenv = require('dotenv');
const workoutRoutineDisplayRoute = require("./routes/workoutRoutineDisplayRoute");
const friendAllRoute = require('./routes/friendAllRoute');
const friendBlockedRoute = require('./routes/friendBlockedRoute');
const workoutRoute = require("./routes/workoutRoute");

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

// Friends page - All friends
app.use('/api/friends', friendAllRoute(db));
// Friends page - Blocked friends
app.use('/api/friends/blocked', friendBlockedRoute(db));

// workout routine display route
app.use("/api/workout", workoutRoutineDisplayRoute(db));

// workout choose and save route
app.use("/api/workouts", workoutRoute(db));

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
  console.log("Fetching workouts for user_id:", user_id); 
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

// API to start a workout and conditionally update user stats
app.post('/api/workouts/start', (req, res) => {
  const { workoutName, maxOutWeightweight\, user_id } = req.body;

  // Determine the column to update based on the workout name
  let columnToUpdate;
  if (workoutName === 'Squat') {
    columnToUpdate = 'squat';
  } else if (workoutName === 'Bench Press') {
    columnToUpdate = 'benchpress';
  } else if (workoutName === 'Deadlift') {
    columnToUpdate = 'deadlift';
  }

  if (!columnToUpdate) {
    // If the workout is not one of the tracked lifts, return a message
    return res.status(400).json({ message: 'This workout does not update tracked lifts.' });
  }

  // Fetch the current value of the column to compare
  const fetchSql = `SELECT ${columnToUpdate} FROM users WHERE auth0_id = ?`;
  db.query(fetchSql, [user_id], (err, results) => {
    if (err) {
      console.error('Error fetching current stat:', err);
      return res.status(500).json({ message: 'Failed to fetch current stat.' });
    }

    const currentValue = results[0][columnToUpdate];
    if (weight > currentValue) {
      // Update the column if the new weight is greater
      const updateSql = `UPDATE users SET ${columnToUpdate} = ? WHERE auth0_id = ?`;
      db.query(updateSql, [weight, user_id], (updateErr) => {
        if (updateErr) {
          console.error('Error updating user stats:', updateErr);
          return res.status(500).json({ message: 'Failed to update user stats.' });
        }
        res.json({ message: `Successfully updated ${columnToUpdate} with weight ${weight}.` });
      });
    } else {
      // Do not update if the new weight is not greater
      res.json({ message: `No update made. Current ${columnToUpdate}: ${currentValue}, New: ${weight}.` });
    }
  });
});


// Start the server and export the server instance
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// Export both the app and the database connection
module.exports = { server, db };
