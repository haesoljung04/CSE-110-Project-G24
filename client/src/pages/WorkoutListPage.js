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
