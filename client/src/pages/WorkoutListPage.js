// import React, { useState, useEffect } from 'react';
// import './WorkoutListPage.css';

// const WorkoutListPage = () => {
//   const [workouts, setWorkouts] = useState([]);
//   const [selectedWorkout, setSelectedWorkout] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const user_id = 1; // Replace with dynamic user ID (e.g., retrieved from authentication)

//   // Fetch workouts from the backend
//   const fetchWorkouts = async () => {
//     try {
//       const response = await fetch(`http://localhost:5001/api/workouts/${user_id}`);
//       if (!response.ok) throw new Error('Failed to fetch workouts.');
//       const data = await response.json();
//       setWorkouts(data); // Update state with fetched workouts
//     } catch (err) {
//       setError('Failed to load workouts.');
//       console.error(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchWorkouts();
//   }, []);

//   const handleWorkoutSelect = (workout) => {
//     setSelectedWorkout(workout);
//   };

//   const handleStartWorkout = () => {
//     if (selectedWorkout) {
//       alert(`Starting: ${selectedWorkout.workoutName}`);
//     } else {
//       alert('Please select a workout to start!');
//     }
//   };

//   const handleStartRandomWorkout = () => {
//     if (workouts.length > 0) {
//       const randomWorkout = workouts[Math.floor(Math.random() * workouts.length)];
//       alert(`Starting Random Workout: ${randomWorkout.workoutName}`);
//     } else {
//       alert('No workouts available to start randomly!');
//     }
//   };

//   const handleDeleteWorkout = async (id) => {
//     try {
//       const response = await fetch(`http://localhost:5001/api/workouts/${id}/${user_id}`, {
//         method: 'DELETE',
//       });
//       if (!response.ok) throw new Error('Failed to delete workout.');
//       // Immediately remove the deleted workout from state
//       setWorkouts((prev) => prev.filter((workout) => workout.id !== id));
//       alert('Workout deleted successfully!');
//     } catch (err) {
//       console.error(err.message);
//       setError('Failed to delete workout.');
//     }
//   };

//   return (
//     <div className="workout-list-page">
//       <h1>Your Workouts</h1>
//       {loading ? (
//         <p>Loading workouts...</p>
//       ) : error ? (
//         <p className="error">{error}</p>
//       ) : (
//         <div className="workout-list">
//           {workouts.length > 0 ? (
//             workouts.map((workout) => (
//               <div
//                 key={workout.id}
//                 className={`workout-card ${selectedWorkout?.id === workout.id ? 'selected' : ''}`}
//                 onClick={() => handleWorkoutSelect(workout)}
//               >
//                 <h2>{workout.workoutName}</h2>
//                 <p>
//                   <strong>Sets:</strong> {workout.sets}, <strong>Reps:</strong> {workout.reps}
//                 </p>
//                 <p>
//                   <strong>Weight:</strong> {workout.weight} kg, <strong>Max Out:</strong> {workout.maxOutWeight} kg
//                 </p>
//                 <button onClick={() => handleDeleteWorkout(workout.id)}>Delete</button>
//               </div>
//             ))
//           ) : (
//             <p>No workouts found. Add workouts to see them here.</p>
//           )}
//         </div>
//       )}
//       <div className="action-buttons">
//         <button className="start-button" onClick={handleStartWorkout}>
//           Start Selected Workout
//         </button>
//         <button className="random-button" onClick={handleStartRandomWorkout}>
//           Start Random Workout
//         </button>
//       </div>
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };

// export default WorkoutListPage;


import React, { useState, useEffect } from 'react';
import './WorkoutListPage.css';

const WorkoutListPage = () => {
  const exampleWorkouts = [
    {
      id: 1,
      workoutName: 'Chest Day',
      sets: 4,
      reps: 12,
      weight: 70,
      maxOutWeight: 100,
    },
    {
      id: 2,
      workoutName: 'Leg Day',
      sets: 3,
      reps: 10,
      weight: 80,
      maxOutWeight: 120,
    },
    {
      id: 3,
      workoutName: 'Arm Day',
      sets: 5,
      reps: 15,
      weight: 20,
      maxOutWeight: 30,
    },
  ];

  const [selectedWorkout, setSelectedWorkout] = useState(null);

  const [weatherImage, setWeatherImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleWorkoutSelect = (workout) => {
    setSelectedWorkout(workout);
  };

  const handleStartWorkout = () => {
    if (selectedWorkout) {
      alert(`Starting: ${selectedWorkout.workoutName}`);
    } else {
      alert('Please select a workout to start!');
    }
  };

  const handleStartRandomWorkout = () => {
    const randomWorkout = exampleWorkouts[Math.floor(Math.random() * exampleWorkouts.length)];
    alert(`Starting Random Workout: ${randomWorkout.workoutName}`);
  };
  useEffect(() => {
    const fetchWeather = async (latitude, longitude) => {
      const apiKey = '5675a2b07eca303dfde83993b64733d8'; 
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.weather && data.weather[0].icon) {
          const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          setWeatherImage(iconUrl);
        }
      } catch (err) {
        setError('Failed to fetch weather data');
      } finally {
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError('Geolocation access denied');
          setLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser');
      setLoading(false);
    }
  }, []);

  return (
    <div
      className="workout-list-page"
      style={{
        backgroundImage: weatherImage ? `url(${weatherImage})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h1>Your Workouts</h1>
      <div className="workout-list">
        {exampleWorkouts.map((workout) => (
          <div
            key={workout.id}
            className={`workout-card ${selectedWorkout?.id === workout.id ? 'selected' : ''}`}
            onClick={() => handleWorkoutSelect(workout)}
          >
            <h2>{workout.workoutName}</h2>
            <p>
              <strong>Sets:</strong> {workout.sets}, <strong>Reps:</strong> {workout.reps}
            </p>
            <p>
              <strong>Weight:</strong> {workout.weight} kg, <strong>Max Out:</strong> {workout.maxOutWeight} kg
            </p>
          </div>
        ))}
      </div>
      <div className="action-buttons">
        <button className="start-button" onClick={handleStartWorkout}>
          Start Selected Workout
        </button>
        <button className="random-button" onClick={handleStartRandomWorkout}>
          Start Random Workout
        </button>
      </div>
      {loading && <p>Loading weather...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default WorkoutListPage;
