# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### Friendlist Database"
Run follwing commands
1. 
USE workout_app;
(if doesn't exist run CREATE DATABASE workout_app; and then run USE workout_app);
2. 
CREATE TABLE friends (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    blocked BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
3. Insert for testing purpose (Only Sarah Taylor is blocked initially)
INSERT INTO friends (name, blocked) VALUES
('Michael Brown', FALSE),
('Emily Davis', FALSE),
('Chris Wilson', FALSE),
('Sarah Taylor', TRUE),
('David Harris', FALSE);
4. Checking table
SELECT * FROM friends;