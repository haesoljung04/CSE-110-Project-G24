import React, { useState } from 'react';
import './WorkoutPage.css';

const WorkoutPage = () => {

  const [workoutName, setWorkoutName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [maxOutWeight, setMaxOutWeight] = useState('');
  const [workouts, setWorkouts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(null);

  const handleAddOrUpdateWorkout = (e) => {
    e.preventDefault();
    if (workoutName && sets && reps && weight && maxOutWeight) {
      if (isEditing) {
        const updatedWorkouts = workouts.map((workout, index) =>
          index === currentWorkoutIndex ? { workoutName, sets, reps, weight, maxOutWeight } : workout
        );
        setWorkouts(updatedWorkouts);
        setIsEditing(false);
        setCurrentWorkoutIndex(null);
      } else {
        const newWorkout = { workoutName, sets, reps, weight, maxOutWeight };
        setWorkouts([...workouts, newWorkout]);
      }
      setWorkoutName('');
      setSets('');
      setReps('');
      setWeight('');
      setMaxOutWeight('');
    }
  };

  const handleEditWorkout = (index) => {
    const workout = workouts[index];
    setWorkoutName(workout.workoutName);
    setSets(workout.sets);
    setReps(workout.reps);
    setWeight(workout.weight);
    setMaxOutWeight(workout.maxOutWeight);
    setIsEditing(true);
    setCurrentWorkoutIndex(index);
  };

  const handleDeleteWorkout = (index) => {
    const updatedWorkouts = workouts.filter((_, i) => i !== index);
    setWorkouts(updatedWorkouts);
  };

  return (
    <div className="workout-page">
      <h1>Create Workout Plan</h1>

      <form className="workout-form" onSubmit={handleAddOrUpdateWorkout}>
        <div className="form-group">
          <label>Workout Name:</label>
          <input
            type="text"
            value={workoutName}
            onChange={(e) => setWorkoutName(e.target.value)}
            placeholder="Enter workout name"
          />
        </div>

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
          {isEditing ? 'Update Workout' : 'Add Workout'}
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
                <span className="workout-name">{workout.workoutName}</span> -
                <span className="workout-sets"> {workout.sets} sets</span>,
                <span className="workout-reps"> {workout.reps} reps</span>,
                <span className="workout-weight"> {workout.weight} kg</span>,
                <span className="workout-maxout"> Max Out: {workout.maxOutWeight} kg</span>
                <button className="edit-workout-button" onClick={() => handleEditWorkout(index)}>Edit</button>
                <button className="delete-workout-button" onClick={() => handleDeleteWorkout(index)}>Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default WorkoutPage;