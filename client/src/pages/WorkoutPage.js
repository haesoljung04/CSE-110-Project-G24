import React, { useState, useEffect } from 'react';
import './WorkoutPage.css';

const WorkoutPage = () => {
  const [workoutName, setWorkoutName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [maxOutWeight, setMaxOutWeight] = useState('');
  const [workouts, setWorkouts] = useState([]); // Initialize as an empty array
  const [isEditing, setIsEditing] = useState(false);
  const [currentWorkoutId, setCurrentWorkoutId] = useState(null);

  const user_id = localStorage.getItem('user_id'); // Replace with your login logic

  // Fetch workouts for the logged-in user
  useEffect(() => {
    if (!user_id) {
      console.error('No user_id found!');
      return;
    }

    fetch(`http://localhost:5001/api/workouts/${user_id}`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setWorkouts(data);
        } else {
          console.error('Expected array but got:', data);
          setWorkouts([]); // Ensure state remains an array
        }
      })
      .catch((err) => {
        console.error('Error fetching workouts:', err);
        setWorkouts([]); // Handle errors by resetting state to an empty array
      });
  }, [user_id]);

  const handleAddOrUpdateWorkout = (e) => {
    e.preventDefault();
    if (workoutName && sets && reps && weight && maxOutWeight) {
      const workoutData = { workoutName, sets, reps, weight, maxOutWeight, user_id };

      if (isEditing) {
        // Update existing workout
        fetch(`http://localhost:5001/api/workouts/${currentWorkoutId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(workoutData),
        })
          .then(() => {
            setWorkouts((prev) =>
              prev.map((workout) =>
                workout.id === currentWorkoutId ? { id: currentWorkoutId, ...workoutData } : workout
              )
            );
            setIsEditing(false);
            setCurrentWorkoutId(null);
          })
          .catch((err) => console.error('Error updating workout:', err));
      } else {
        // Add new workout
        fetch('http://localhost:5001/api/workouts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(workoutData),
        })
          .then((res) => res.json())
          .then((data) => {
            setWorkouts([...workouts, { id: data.id, ...workoutData }]);
          })
          .catch((err) => console.error('Error adding workout:', err));
      }

      // Reset form
      setWorkoutName('');
      setSets('');
      setReps('');
      setWeight('');
      setMaxOutWeight('');
    }
  };

  const handleEditWorkout = (id) => {
    const workout = workouts.find((w) => w.id === id);
    if (workout) {
      setWorkoutName(workout.workoutName);
      setSets(workout.sets);
      setReps(workout.reps);
      setWeight(workout.weight);
      setMaxOutWeight(workout.maxOutWeight);
      setIsEditing(true);
      setCurrentWorkoutId(id);
    }
  };

  const handleDeleteWorkout = (id) => {
    fetch(`http://localhost:5001/api/workouts/${id}/${user_id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
      })
      .catch((err) => console.error('Error deleting workout:', err));
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
        {Array.isArray(workouts) && workouts.length > 0 ? (
          <ul>
            {workouts.map((workout) => (
              <li key={workout.id}>
                <span className="workout-name">{workout.workoutName}</span> -
                <span className="workout-sets"> {workout.sets} sets</span>,
                <span className="workout-reps"> {workout.reps} reps</span>,
                <span className="workout-weight"> {workout.weight} kg</span>,
                <span className="workout-maxout"> Max Out: {workout.maxOutWeight} kg</span>
                <button onClick={() => handleEditWorkout(workout.id)}>Edit</button>
                <button onClick={() => handleDeleteWorkout(workout.id)}>Delete</button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No workouts added yet. Start adding your workouts!</p>
        )}
      </div>
    </div>
  );
};

export default WorkoutPage;
