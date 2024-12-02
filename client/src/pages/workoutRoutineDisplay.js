// import React, { useState } from "react";
// import "./workoutRoutineDisplay.css";

// const WorkoutRoutineDisplay = () => {
//   // List of all exercises
//   const allExercises = [
//     "Arnold Press", "Back Squat", "Barbell Bench Press", "Barbell Curl", "Barbell Deadlift",
//     "Barbell Front Squat", "Barbell Overhead Press", "Barbell Row", "Barbell Shrug", "Bench Press",
//     "Bicep Curl", "Bulgarian Split Squat", "Cable Crossover", "Cable Lateral Raise", "Cable Pull-Through",
//     "Cable Row", "Cable Tricep Pushdown", "Calf Raise", "Chest Fly", "Chin-Up", "Clean", "Clean and Jerk",
//     "Close-Grip Bench Press", "Concentration Curl", "Conventional Deadlift", "Dead Hang", "Deadlift",
//     "Decline Bench Press", "Dumbbell Bench Press", "Dumbbell Chest Fly", "Dumbbell Curl", "Dumbbell Deadlift",
//     "Dumbbell Floor Press", "Dumbbell Front Raise", "Dumbbell Hammer Curl", "Dumbbell Lateral Raise",
//     "Dumbbell Overhead Press", "Dumbbell Pullover", "Dumbbell Row", "Dumbbell Shrug", "Dumbbell Split Squat",
//     "Dumbbell Step-Up", "Dumbbell Thruster", "Dumbbell Tricep Kickback", "Farmer's Walk", "Flat Bench Dumbbell Press",
//     "Front Raise", "Front Squat", "Good Morning", "Hack Squat", "Hammer Curl", "Hang Clean", "Hang Power Clean",
//     "High Pull", "Hip Thrust", "Incline Bench Press", "Incline Dumbbell Bench Press", "Incline Dumbbell Curl",
//     "Jefferson Deadlift", "Kettlebell Clean", "Kettlebell Goblet Squat", "Kettlebell Swing", "Kettlebell Turkish Get-Up",
//     "Landmine Press", "Landmine Row", "Lat Pulldown", "Lateral Raise", "Leg Curl", "Leg Extension", "Leg Press",
//     "Medicine Ball Slam", "Military Press", "Overhead Dumbbell Press", "Overhead Squat", "Overhead Tricep Extension",
//     "Pendlay Row", "Pistol Squat", "Power Clean", "Power Snatch", "Preacher Curl", "Pull-Up", "Push Press",
//     "Push-Up", "Rack Pull", "Rear Delt Fly", "Romanian Deadlift", "Russian Twist", "Seated Cable Row",
//     "Seated Dumbbell Press", "Seated Overhead Press", "Skull Crusher", "Snatch", "Sumo Deadlift", "T-Bar Row",
//     "Trap Bar Deadlift", "Tricep Dip", "Tricep Pushdown", "Upright Row", "Weighted Pull-Up", "Zottman Curl"
//   ];

//   // Mocked recent searches (normally fetched from local storage or database)
//   const [recentSearches] = useState(["Bench Press", "Barbell Curl", "Deadlift", "Lat Pulldown", "Dumbbell Row"]);

//   return (
//     <div className="workout-container">
//       <header className="workout-header">
//         <button className="back-button">←</button>
//         <input className="search-input" type="text" placeholder="Value" />
//         <button className="add-button">Add</button>
//       </header>
      
//       <div className="filter-buttons">
//         <button className="filter-button">Body parts</button>
//         <button className="filter-button">Category</button>
//       </div>
      
//       <div className="workout-list">
//         <h3>Recent</h3>
//         <ul className="recent-list">
//           {recentSearches.map((exercise, index) => (
//             <li key={index}>{exercise}</li>
//           ))}
//         </ul>
        
//         <h3>A-Z</h3>
//         <ul className="exercise-list">
//           {allExercises.map((exercise, index) => (
//             <li key={index}>{exercise}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default WorkoutRoutineDisplay;




// import React, { useState } from "react";
// import "./workoutRoutineDisplay.css";

// const WorkoutRoutineDisplay = () => {
//   // List of all exercises
//   const allExercises = [
//     "Arnold Press", "Back Squat", "Barbell Bench Press", "Barbell Curl", "Barbell Deadlift",
//     "Barbell Front Squat", "Barbell Overhead Press", "Barbell Row", "Barbell Shrug", "Bench Press",
//     "Bicep Curl", "Bulgarian Split Squat", "Cable Crossover", "Cable Lateral Raise", "Cable Pull-Through",
//     "Cable Row", "Cable Tricep Pushdown", "Calf Raise", "Chest Fly", "Chin-Up", "Clean", "Clean and Jerk",
//     "Close-Grip Bench Press", "Concentration Curl", "Conventional Deadlift", "Dead Hang", "Deadlift",
//     "Decline Bench Press", "Dumbbell Bench Press", "Dumbbell Chest Fly", "Dumbbell Curl", "Dumbbell Deadlift",
//     "Dumbbell Floor Press", "Dumbbell Front Raise", "Dumbbell Hammer Curl", "Dumbbell Lateral Raise",
//     "Dumbbell Overhead Press", "Dumbbell Pullover", "Dumbbell Row", "Dumbbell Shrug", "Dumbbell Split Squat",
//     "Dumbbell Step-Up", "Dumbbell Thruster", "Dumbbell Tricep Kickback", "Farmer's Walk", "Flat Bench Dumbbell Press",
//     "Front Raise", "Front Squat", "Good Morning", "Hack Squat", "Hammer Curl", "Hang Clean", "Hang Power Clean",
//     "High Pull", "Hip Thrust", "Incline Bench Press", "Incline Dumbbell Bench Press", "Incline Dumbbell Curl",
//     "Jefferson Deadlift", "Kettlebell Clean", "Kettlebell Goblet Squat", "Kettlebell Swing", "Kettlebell Turkish Get-Up",
//     "Landmine Press", "Landmine Row", "Lat Pulldown", "Lateral Raise", "Leg Curl", "Leg Extension", "Leg Press",
//     "Medicine Ball Slam", "Military Press", "Overhead Dumbbell Press", "Overhead Squat", "Overhead Tricep Extension",
//     "Pendlay Row", "Pistol Squat", "Power Clean", "Power Snatch", "Preacher Curl", "Pull-Up", "Push Press",
//     "Push-Up", "Rack Pull", "Rear Delt Fly", "Romanian Deadlift", "Russian Twist", "Seated Cable Row",
//     "Seated Dumbbell Press", "Seated Overhead Press", "Skull Crusher", "Snatch", "Sumo Deadlift", "T-Bar Row",
//     "Trap Bar Deadlift", "Tricep Dip", "Tricep Pushdown", "Upright Row", "Weighted Pull-Up", "Zottman Curl"
//   ];

//   // State for workout routine
//   const [workoutRoutine, setWorkoutRoutine] = useState([]);

//   // Function to add an exercise to the workout routine
//   const addToRoutine = (exercise) => {
//     if (!workoutRoutine.includes(exercise)) {
//       setWorkoutRoutine((prevRoutine) => [...prevRoutine, exercise]);
//     } else {
//       alert(`${exercise} is already in your workout routine!`);
//     }
//   };

//   return (
//     <div className="workout-container">
//       <header className="workout-header">
//         <button className="back-button">←</button>
//       </header>

//       {/* Workout Routine Section */}
//       <div className="workout-routine">
//         <h2>Your Workout Routine</h2>
//         {workoutRoutine.length > 0 ? (
//           <ul className="routine-list">
//             {workoutRoutine.map((exercise, index) => (
//               <li key={index} className="routine-item">{exercise}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>No exercises added to your routine yet.</p>
//         )}
//       </div>

//       <h3 className="exercise-header">Workout Exercises</h3>

//       {/* Exercise List Section */}
//       <div className="workout-list">
//         {/* <h3>A-Z</h3> */}
//         <ul className="exercise-list">
//           {allExercises.map((exercise, index) => (
//             <li key={index} className="exercise-item">
//               <span className="exercise-name">{exercise}</span>
//               <button
//                 className="add-button"
//                 onClick={() => addToRoutine(exercise)}
//               >
//                 Add
//               </button>
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default WorkoutRoutineDisplay;




import React, { useState } from "react";
import "./workoutRoutineDisplay.css";

const WorkoutRoutineDisplay = () => {
  const allExercises = [
    "Arnold Press  ", "Back Squa  ", "Barbell Bench Press  ", "Barbell Curl  ", "Barbell Deadlift  ",
    "Barbell Front Squat  ", "Barbell Overhead Press  ", "Barbell Row  ", "Barbell Shrug  ", "Bench Press  ",
    "Bicep Curl  ", "Bulgarian Split Squat  ", "Cable Crossover  ", "Cable Lateral Raise  ", "Cable Pull-Through  ",
    "Cable Row  ", "Cable Tricep Pushdown  ", "Calf Raise  ", "Chest Fly  ", "Chin-Up  ", "Clean  ", "Clean and Jerk  ",
    "Close-Grip Bench Press  ", "Concentration Curl  ", "Conventional Deadlift  ", "Dead Hang  ", "Deadlift  ",
    "Decline Bench Press  ", "Dumbbell Bench Press  ", "Dumbbell Chest Fly  ", "Dumbbell Curl  ", "Dumbbell Deadlift"  ,
    "Dumbbell Floor Press  ", "Dumbbell Front Raise  ", "Dumbbell Hammer Curl  ", "Dumbbell Lateral Raise  ",
    "Dumbbell Overhead Press  ", "Dumbbell Pullover  ", "Dumbbell Row  ", "Dumbbell Shrug  ", "Dumbbell Split Squat  ",
    "Dumbbell Step-Up  ", "Dumbbell Thruster  ", "Dumbbell Tricep Kickback  ", "Farmer's Walk  ", "Flat Bench Dumbbell Press  ",
    "Front Raise  ", "Front Squat  ", "Good Morning  ", "Hack Squat  ", "Hammer Curl  ", "Hang Clean  ", "Hang Power Clean  ",
    "High Pull  ", "Hip Thrust  ", "Incline Bench Press  ", "Incline Dumbbell Bench Press  ", "Incline Dumbbell Curl  ",
    "Jefferson Deadlift  ", "Kettlebell Clean  ", "Kettlebell Goblet Squat  ", "Kettlebell Swing  ", "Kettlebell Turkish Get-Up  ",
    "Landmine Press  ", "Landmine Row  ", "Lat Pulldown  ", "Lateral Raise  ", "Leg Curl  ", "Leg Extension  ", "Leg Press  ",
    "Medicine Ball Slam  ", "Military Press  ", "Overhead Dumbbell Press  ", "Overhead Squat  ", "Overhead Tricep Extension  ",
    "Pendlay Row  ", "Pistol Squat  ", "Power Clean  ", "Power Snatch  ", "Preacher Curl  ", "Pull-Up  ", "Push Press  ",
    "Push-Up  ", "Rack Pull  ", "Rear Delt Fly  ", "Romanian Deadlift  ", "Russian Twist  ", "Seated Cable Row  ",
    "Seated Dumbbell Press  ", "Seated Overhead Press  ", "Skull Crusher  ", "Snatch  ", "Sumo Deadlift  ", "T-Bar Row  ",
    "Trap Bar Deadlift  ", "Tricep Dip  ", "Tricep Pushdown  ", "Upright Row  ", "Weighted Pull-Up  ", "Zottman Curl  "
  ];

  const [workoutRoutine, setWorkoutRoutine] = useState([]);

  const addToRoutine = (exercise) => {
    if (!workoutRoutine.includes(exercise)) {
      setWorkoutRoutine((prevRoutine) => [...prevRoutine, exercise]);
    } else {
      alert(`${exercise} is already in your workout routine!`);
    }
  };

  const deleteFromRoutine = (exercise) => {
    setWorkoutRoutine((prevRoutine) =>
      prevRoutine.filter((item) => item !== exercise)
    );
  };

  const saveRoutine = () => {
    // need to connect to backend
    console.log("Saved Routine:", workoutRoutine);
    alert("Your workout routine has been saved!");
  };

  return (
    <div className="workout-container">
      <header className="workout-header">
        <button className="back-button">←</button>
      </header>

      {/* Workout Routine Section */}
      <div className="workout-routine">
        <h3>Your Workout Routine</h3>
        {workoutRoutine.length > 0 ? (
          <ul className="routine-list">
            {workoutRoutine.map((exercise, index) => (
              <li key={index} className="routine-item">
                {exercise}
                <button
                  className="delete-button"
                  onClick={() => deleteFromRoutine(exercise)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No exercises added to your routine yet.</p>
        )}
        {workoutRoutine.length > 0 && (
          <button className="save-button" onClick={saveRoutine}>
            Save Routine
          </button>
        )}
      </div>

      {/* Header for Exercise List */}
      <h2 className="exercise-header">Workout Exercises</h2>

      {/* Exercise List Section */}
      <div className="workout-list">
        <ul className="exercise-list">
          {allExercises.map((exercise, index) => (
            <li key={index} className="exercise-item">
              <span className="exercise-name">{exercise}</span>
              <button
                className="add-button"
                onClick={() => addToRoutine(exercise)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default WorkoutRoutineDisplay;