import React, { useState } from "react";
import "./workoutRoutineDisplay.css";

const WorkoutRoutineDisplay = () => {
  // List of all exercises
  const allExercises = [
    "Arnold Press", "Back Squat", "Barbell Bench Press", "Barbell Curl", "Barbell Deadlift",
    "Barbell Front Squat", "Barbell Overhead Press", "Barbell Row", "Barbell Shrug", "Bench Press",
    "Bicep Curl", "Bulgarian Split Squat", "Cable Crossover", "Cable Lateral Raise", "Cable Pull-Through",
    "Cable Row", "Cable Tricep Pushdown", "Calf Raise", "Chest Fly", "Chin-Up", "Clean", "Clean and Jerk",
    "Close-Grip Bench Press", "Concentration Curl", "Conventional Deadlift", "Dead Hang", "Deadlift",
    "Decline Bench Press", "Dumbbell Bench Press", "Dumbbell Chest Fly", "Dumbbell Curl", "Dumbbell Deadlift",
    "Dumbbell Floor Press", "Dumbbell Front Raise", "Dumbbell Hammer Curl", "Dumbbell Lateral Raise",
    "Dumbbell Overhead Press", "Dumbbell Pullover", "Dumbbell Row", "Dumbbell Shrug", "Dumbbell Split Squat",
    "Dumbbell Step-Up", "Dumbbell Thruster", "Dumbbell Tricep Kickback", "Farmer's Walk", "Flat Bench Dumbbell Press",
    "Front Raise", "Front Squat", "Good Morning", "Hack Squat", "Hammer Curl", "Hang Clean", "Hang Power Clean",
    "High Pull", "Hip Thrust", "Incline Bench Press", "Incline Dumbbell Bench Press", "Incline Dumbbell Curl",
    "Jefferson Deadlift", "Kettlebell Clean", "Kettlebell Goblet Squat", "Kettlebell Swing", "Kettlebell Turkish Get-Up",
    "Landmine Press", "Landmine Row", "Lat Pulldown", "Lateral Raise", "Leg Curl", "Leg Extension", "Leg Press",
    "Medicine Ball Slam", "Military Press", "Overhead Dumbbell Press", "Overhead Squat", "Overhead Tricep Extension",
    "Pendlay Row", "Pistol Squat", "Power Clean", "Power Snatch", "Preacher Curl", "Pull-Up", "Push Press",
    "Push-Up", "Rack Pull", "Rear Delt Fly", "Romanian Deadlift", "Russian Twist", "Seated Cable Row",
    "Seated Dumbbell Press", "Seated Overhead Press", "Skull Crusher", "Snatch", "Sumo Deadlift", "T-Bar Row",
    "Trap Bar Deadlift", "Tricep Dip", "Tricep Pushdown", "Upright Row", "Weighted Pull-Up", "Zottman Curl"
  ];

  // Mocked recent searches (normally fetched from local storage or database)
  const [recentSearches] = useState(["Bench Press", "Barbell Curl", "Deadlift", "Lat Pulldown", "Dumbbell Row"]);

  return (
    <div className="workout-container">
      <header className="workout-header">
        <button className="back-button">←</button>
        <input className="search-input" type="text" placeholder="Value" />
        <button className="add-button">Add</button>
      </header>
      
      <div className="filter-buttons">
        <button className="filter-button">Body parts</button>
        <button className="filter-button">Category</button>
      </div>
      
      <div className="workout-list">
        <h3>Recent</h3>
        <ul className="recent-list">
          {recentSearches.map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ul>
        
        <h3>A-Z</h3>
        <ul className="exercise-list">
          {allExercises.map((exercise, index) => (
            <li key={index}>{exercise}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutRoutineDisplay;