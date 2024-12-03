const express = require("express");
const router = express.Router();
const workoutRoutineDisplayController = require("../controllers/workoutRoutineDisplayController");

module.exports = (db) => {
  router.post("/save", (req, res) =>
    workoutRoutineDisplayController.saveWorkoutRoutine(req, res, db)
  );

  return router;
};