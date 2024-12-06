const mysql = require('mysql2');
const dotenv = require('dotenv');

dotenv.config();

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  multipleStatements: true,
});

// Table creation queries
const createTablesQuery = `
  DROP TABLE IF EXISTS workouts;
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    auth0_id VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    profile_picture VARCHAR(255),
    gym_streak INT DEFAULT 0,
    squat INT DEFAULT 0,
    benchpress INT DEFAULT 0,
    deadlift INT DEFAULT 0
  );

  CREATE TABLE workouts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    workoutName VARCHAR(255) NOT NULL,
    sets INT NOT NULL,
    reps INT NOT NULL,
    weight FLOAT NOT NULL,
    maxOutWeight FLOAT NOT NULL,
    user_id VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(auth0_id) ON DELETE CASCADE
  );
`;

// Execute table creation queries
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');

  db.query(createTablesQuery, (err) => {
    if (err) {
      console.error('Error creating tables:', err);
    } else {
      console.log('Tables dropped and recreated successfully.');
    }
    db.end(); // Close the connection
  });
});