// import React, { useState } from "react";
// import "./WorkoutPage.css";

// const WorkoutPage = () => {
//   const [workoutType, setWorkoutType] = useState("");
//   const [workoutName, setWorkoutName] = useState("");
//   const [sets, setSets] = useState("");
//   const [reps, setReps] = useState("");
//   const [weight, setWeight] = useState("");
//   const [maxOutWeight, setMaxOutWeight] = useState("");
//   const [workouts, setWorkouts] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(null);

//   // Predefined workout types and corresponding workouts
//   const workoutTypes = ["Leg Day", "Chest Day", "Arm Day", "Back Day", "Shoulder Day", "Abs Day"];
  
//   const workoutNames = {
//     "Leg Day": ["Squat", "Lunges", "Leg Press", "Deadlift", "Leg Extension", "Calf Raise"],
//     "Chest Day": ["Bench Press", "Incline Bench Press", "Dumbbell Fly", "Push-Up", "Cable Crossover"],
//     "Arm Day": ["Bicep Curl", "Tricep Pushdown", "Hammer Curl", "Skull Crusher", "Dumbbell Kickback"],
//     "Back Day": ["Pull-Up", "Lat Pulldown", "Bent-Over Row", "Deadlift", "Seated Cable Row"],
//     "Shoulder Day": ["Overhead Press", "Lateral Raise", "Front Raise", "Shrugs", "Arnold Press"],
//     "Abs Day": ["Crunches", "Plank", "Russian Twist", "Leg Raise", "Bicycle Crunch"],
//   };

//   const handleAddOrUpdateWorkout = (e) => {
//     e.preventDefault();
//     if (workoutType && workoutName && sets && reps && weight && maxOutWeight) {
//       if (isEditing) {
//         const updatedWorkouts = workouts.map((workout, index) =>
//           index === currentWorkoutIndex
//             ? { workoutType, workoutName, sets, reps, weight, maxOutWeight }
//             : workout
//         );
//         setWorkouts(updatedWorkouts);
//         setIsEditing(false);
//         setCurrentWorkoutIndex(null);
//       } else {
//         const newWorkout = { workoutType, workoutName, sets, reps, weight, maxOutWeight };
//         setWorkouts([...workouts, newWorkout]);
//       }
//       setWorkoutName("");
//       setSets("");
//       setReps("");
//       setWeight("");
//       setMaxOutWeight("");
//     }
//   };

//   const handleEditWorkout = (index) => {
//     const workout = workouts[index];
//     setWorkoutType(workout.workoutType);
//     setWorkoutName(workout.workoutName);
//     setSets(workout.sets);
//     setReps(workout.reps);
//     setWeight(workout.weight);
//     setMaxOutWeight(workout.maxOutWeight);
//     setIsEditing(true);
//     setCurrentWorkoutIndex(index);
//   };

//   const handleDeleteWorkout = (index) => {
//     const updatedWorkouts = workouts.filter((_, i) => i !== index);
//     setWorkouts(updatedWorkouts);
//   };

//   return (
//     <div className="workout-page">
//       <h1>Create Workout Plan</h1>

//       <form className="workout-form" onSubmit={handleAddOrUpdateWorkout}>
//         {/* Workout Type Selection */}
//         <div className="form-group">
//           <label>Workout Type:</label>
//           <select
//             value={workoutType}
//             onChange={(e) => {
//               setWorkoutType(e.target.value);
//               setWorkoutName(""); // Reset workout name when changing type
//             }}
//           >
//             <option value="" disabled>
//               Select a workout type
//             </option>
//             {workoutTypes.map((type, index) => (
//               <option key={index} value={type}>
//                 {type}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* Workout Name Selection */}
//         {workoutType && (
//           <div className="form-group">
//             <label>Workout Name:</label>
//             <select
//               value={workoutName}
//               onChange={(e) => setWorkoutName(e.target.value)}
//             >
//               <option value="" disabled>
//                 Select a workout
//               </option>
//               {workoutNames[workoutType].map((name, index) => (
//                 <option key={index} value={name}>
//                   {name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         )}

//         {/* Sets */}
//         <div className="form-group">
//           <label>Number of Sets:</label>
//           <input
//             type="number"
//             value={sets}
//             onChange={(e) => setSets(e.target.value)}
//             placeholder="Enter number of sets"
//           />
//         </div>

//         {/* Reps */}
//         <div className="form-group">
//           <label>Number of Reps:</label>
//           <input
//             type="number"
//             value={reps}
//             onChange={(e) => setReps(e.target.value)}
//             placeholder="Enter number of reps"
//           />
//         </div>

//         {/* Weight */}
//         <div className="form-group">
//           <label>Weight (kg):</label>
//           <input
//             type="number"
//             value={weight}
//             onChange={(e) => setWeight(e.target.value)}
//             placeholder="Enter weight"
//           />
//         </div>

//         {/* Max Out Weight */}
//         <div className="form-group">
//           <label>Max Out Weight (kg):</label>
//           <input
//             type="number"
//             value={maxOutWeight}
//             onChange={(e) => setMaxOutWeight(e.target.value)}
//             placeholder="Enter max out weight"
//           />
//         </div>

//         <button type="submit" className="add-workout-button">
//           {isEditing ? "Update Workout" : "Add Workout"}
//         </button>
//       </form>

//       {/* Display the list of workouts */}
//       <div className="workout-list">
//         <h2>Your Workouts</h2>
//         {workouts.length === 0 ? (
//           <p>No workouts added yet. Start adding your workouts!</p>
//         ) : (
//           <ul>
//             {workouts.map((workout, index) => (
//               <li key={index}>
//                 <div className="workout-details">
//                   <strong>{workout.workoutType}</strong>:{" "}
//                   <span className="workout-name">{workout.workoutName}</span> -
//                   <span className="workout-sets"> {workout.sets} sets</span>,
//                   <span className="workout-reps"> {workout.reps} reps</span>,
//                   <span className="workout-weight"> {workout.weight} kg</span>,
//                   <span className="workout-maxout">
//                     {" "}
//                     Max Out: {workout.maxOutWeight} kg
//                   </span>
//                 </div>
//                 <div className="workout-actions">
//                   <button
//                     className="edit-workout-button"
//                     onClick={() => handleEditWorkout(index)}
//                   >
//                     Edit
//                   </button>
//                   <button
//                     className="delete-workout-button"
//                     onClick={() => handleDeleteWorkout(index)}
//                   >
//                     Delete
//                   </button>
//                 </div>
//               </li>
//             ))}
//             {/* {workouts.map((workout, index) => (
//               <li key={index}>
//                 <strong>{workout.workoutType}</strong>:{" "}
//                 <span className="workout-name">{workout.workoutName}</span> -
//                 <span className="workout-sets"> {workout.sets} sets</span>,
//                 <span className="workout-reps"> {workout.reps} reps</span>,
//                 <span className="workout-weight"> {workout.weight} kg</span>,
//                 <span className="workout-maxout">
//                   {" "}
//                   Max Out: {workout.maxOutWeight} kg
//                 </span>
//                 <button
//                   className="edit-workout-button"
//                   onClick={() => handleEditWorkout(index)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="delete-workout-button"
//                   onClick={() => handleDeleteWorkout(index)}
//                 >
//                   Delete
//                 </button>
//               </li>
//             ))} */}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WorkoutPage;



import React, { useState, useEffect } from "react";
import "./WorkoutPage.css";

const WorkoutPage = () => {
  const [workoutType, setWorkoutType] = useState("");
  const [workoutName, setWorkoutName] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [maxOutWeight, setMaxOutWeight] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(null);

  // Predefined workout types and corresponding workouts
  const workoutTypes = ["Leg Day", "Chest Day", "Arm Day", "Back Day", "Shoulder Day", "Abs Day"];
  const workoutNames = {
    "Leg Day": ["Squat", "Lunges", "Leg Press", "Deadlift", "Leg Extension", "Calf Raise"],
    "Chest Day": ["Bench Press", "Incline Bench Press", "Dumbbell Fly", "Push-Up", "Cable Crossover"],
    "Arm Day": ["Bicep Curl", "Tricep Pushdown", "Hammer Curl", "Skull Crusher", "Dumbbell Kickback"],
    "Back Day": ["Pull-Up", "Lat Pulldown", "Bent-Over Row", "Deadlift", "Seated Cable Row"],
    "Shoulder Day": ["Overhead Press", "Lateral Raise", "Front Raise", "Shrugs", "Arnold Press"],
    "Abs Day": ["Crunches", "Plank", "Russian Twist", "Leg Raise", "Bicycle Crunch"],
  };

  // Fetch workouts from the backend
  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/workouts/get?userId=1"); // Replace with dynamic userId
        if (!response.ok) throw new Error("Failed to fetch workouts.");
        const data = await response.json();
        setWorkouts(data.routines || []); // Set fetched workouts
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchWorkouts();
  }, []);

  const handleAddOrUpdateWorkout = async (e) => {
    e.preventDefault();
    if (workoutType && workoutName && sets && reps && weight && maxOutWeight) {
      const newWorkout = { workoutType, workoutName, sets, reps, weight, maxOutWeight };

      if (isEditing) {
        const updatedWorkouts = workouts.map((workout, index) =>
          index === currentWorkoutIndex ? newWorkout : workout
        );
        setWorkouts(updatedWorkouts);
        setIsEditing(false);
        setCurrentWorkoutIndex(null);
      } else {
        setWorkouts([...workouts, newWorkout]);
      }

      // Clear form fields
      setWorkoutName("");
      setSets("");
      setReps("");
      setWeight("");
      setMaxOutWeight("");

      // Save workouts to the backend
      try {
        const response = await fetch("http://localhost:5001/api/workouts/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: 1, workouts: [...workouts, newWorkout] }), // Replace with dynamic userId
        });

        if (!response.ok) throw new Error("Failed to save workouts.");
        const data = await response.json();
        console.log(data.message);
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleEditWorkout = (index) => {
    const workout = workouts[index];
    setWorkoutType(workout.workoutType);
    setWorkoutName(workout.workoutName);
    setSets(workout.sets);
    setReps(workout.reps);
    setWeight(workout.weight);
    setMaxOutWeight(workout.maxOutWeight);
    setIsEditing(true);
    setCurrentWorkoutIndex(index);
  };

  const handleDeleteWorkout = async (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);

    // Save updated workouts to the backend
    try {
      const response = await fetch("http://localhost:5001/api/workouts/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: 1, workouts: updatedWorkouts }), // Replace with dynamic userId
      });

      if (!response.ok) throw new Error("Failed to save workouts.");
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="workout-page">
      <h1>Create Workout Plan</h1>

      <form className="workout-form" onSubmit={handleAddOrUpdateWorkout}>
        <div className="form-group">
          <label>Workout Type:</label>
          <select
            value={workoutType}
            onChange={(e) => {
              setWorkoutType(e.target.value);
              setWorkoutName("");
            }}
          >
            <option value="" disabled>Select a workout type</option>
            {workoutTypes.map((type, index) => (
              <option key={index} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {workoutType && (
          <div className="form-group">
            <label>Workout Name:</label>
            <select
              value={workoutName}
              onChange={(e) => setWorkoutName(e.target.value)}
            >
              <option value="" disabled>Select a workout</option>
              {workoutNames[workoutType].map((name, index) => (
                <option key={index} value={name}>{name}</option>
              ))}
            </select>
          </div>
        )}

        <div className="form-group">
          <label>Number of Sets:</label>
          <input
            type="number"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            placeholder="Enter number of sets"
          />
        </div>

        <div className="form-group">
          <label>Number of Reps:</label>
          <input
            type="number"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            placeholder="Enter number of reps"
          />
        </div>

        <div className="form-group">
          <label>Weight (kg):</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight"
          />
        </div>

        <div className="form-group">
          <label>Max Out Weight (kg):</label>
          <input
            type="number"
            value={maxOutWeight}
            onChange={(e) => setMaxOutWeight(e.target.value)}
            placeholder="Enter max out weight"
          />
        </div>

        <button type="submit" className="add-workout-button">
          {isEditing ? "Update Workout" : "Add Workout"}
        </button>
      </form>

      <div className="workout-list">
        <h2>Your Workouts</h2>
        {workouts.length === 0 ? (
          <p>No workouts added yet. Start adding your workouts!</p>
        ) : (
          <ul>
            {workouts.map((workout, index) => (
              <li key={index}>
                <div className="workout-details">
                  <strong>{workout.workoutType}</strong>:{" "}
                  <span className="workout-name">{workout.workoutName}</span> -
                  <span className="workout-sets">{workout.sets} sets</span>,
                  <span className="workout-reps">{workout.reps} reps</span>,
                  <span className="workout-weight">{workout.weight} kg</span>,
                  <span className="workout-maxout">Max Out: {workout.maxOutWeight} kg</span>
                </div>
                <div className="workout-actions">
                  <button className="edit-workout-button" onClick={() => handleEditWorkout(index)}>Edit</button>
                  <button className="delete-workout-button" onClick={() => handleDeleteWorkout(index)}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WorkoutPage;