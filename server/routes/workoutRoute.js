// const express = require("express");
// const router = express.Router();
// const workoutController = require("../controllers/workoutController");

// module.exports = (db) => {
//   router.post("/save", (req, res) => workoutController.saveWorkout(req, res, db));
//   router.get("/get", (req, res) => workoutController.getWorkoutRoutines(req, res, db));

//   return router;
// };


const express = require("express");
const router = express.Router();
const workoutController = require("../controllers/workoutController");

module.exports = (db) => {
  router.get("/", (req, res) => {
    const query = 'SELECT * FROM user_workout_routines'; 
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching workouts:', err);
        return res.status(500).json({ error: 'Database query error' });
      }
      res.status(200).json(results);
    });
  });

  router.post("/save", (req, res) => workoutController.saveWorkout(req, res, db));

  router.get("/get", (req, res) => workoutController.getWorkoutRoutines(req, res, db));

  return router;
};