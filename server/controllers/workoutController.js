// exports.saveWorkout = (req, res, db) => {
//     const { userId, workouts } = req.body;
  
//     // Validate input
//     if (!userId || !workouts || !Array.isArray(workouts)) {
//       return res.status(400).json({ error: "Invalid input. Ensure `userId` and `workouts` are provided." });
//     }
  
//     // Convert workouts to JSON format for storage
//     const workoutData = JSON.stringify(workouts);
  
//     // SQL query to insert or update the workout routines for a user
//     const query = `
//       INSERT INTO user_workout_routines (user_id, routine)
//       VALUES (?, ?)
//       ON DUPLICATE KEY UPDATE routine = ?;
//     `;
  
//     db.query(query, [userId, workoutData, workoutData], (err, results) => {
//       if (err) {
//         console.error("Error saving workout routines:", err);
//         return res.status(500).json({ error: "Database error while saving workout routines." });
//       }
  
//       res.status(200).json({ message: "Workout routines saved successfully!" });
//     });
//   };
  
// // exports.getWorkoutRoutines = (req, res, db) => {
// //     const { userId } = req.query;
  
// //     if (!userId) {
// //       return res.status(400).json({ error: "User ID is required to fetch workout routines." });
// //     }
  
// //     const query = "SELECT routine FROM user_workout_routines WHERE user_id = ?";
  
// //     db.query(query, [userId], (err, results) => {
// //       if (err) {
// //         console.error("Error fetching workout routines:", err);
// //         return res.status(500).json({ error: "Database error while fetching workout routines." });
// //       }
  
// //       if (results.length === 0) {
// //         return res.status(404).json({ message: "No workout routines found for this user." });
// //       }
  
// //     //   const routines = JSON.parse(results[0].routine);
// //     //   res.status(200).json({ routines });
// //     res.status(200).json(results); // Directly return the results
// //     });
// //   };

// exports.getWorkoutRoutines = (req, res, db) => {
//     const { user_id } = req.query; // Fetch user_id from query parameters
//     if (!user_id) {
//       return res.status(400).json({ error: "User ID is required to fetch workout routines." });
//     }
  
//     const query = "SELECT * FROM user_workout_routines WHERE user_id = ?";
//     db.query(query, [user_id], (err, results) => {
//       if (err) {
//         console.error("Error fetching workout routines:", err);
//         return res.status(500).json({ error: "Database query error" });
//       }
//       res.status(200).json(results);
//     });
//   };



exports.saveWorkout = (req, res, db) => {
  const { userId, workouts } = req.body;

  // Validate input
  if (!userId || !workouts || !Array.isArray(workouts)) {
    return res.status(400).json({ error: "Invalid input. Ensure `userId` and `workouts` are provided." });
  }

  // Convert workouts to JSON format for storage
  const workoutData = JSON.stringify(workouts);

  // SQL query to insert or update the workout routines for a user
  const query = `
    INSERT INTO user_workout_routines (user_id, routine)
    VALUES (?, ?)
    ON DUPLICATE KEY UPDATE routine = ?;
  `;

  db.query(query, [userId, workoutData, workoutData], (err, results) => {
    if (err) {
      console.error("Error saving workout routines:", err);
      return res.status(500).json({ error: "Database error while saving workout routines." });
    }

    res.status(200).json({ message: "Workout routines saved successfully!" });
  });
};

// exports.getWorkoutRoutines = (req, res, db) => {
//     const { userId } = req.query;

//     if (!userId) {
//       return res.status(400).json({ error: "User ID is required to fetch workout routines." });
//     }

//     const query = "SELECT routine FROM user_workout_routines WHERE user_id = ?";

//     db.query(query, [userId], (err, results) => {
//       if (err) {
//         console.error("Error fetching workout routines:", err);
//         return res.status(500).json({ error: "Database error while fetching workout routines." });
//       }

//       if (results.length === 0) {
//         return res.status(404).json({ message: "No workout routines found for this user." });
//       }

//     //   const routines = JSON.parse(results[0].routine);
//     //   res.status(200).json({ routines });
//     res.status(200).json(results); // Directly return the results
//     });
//   };

exports.getWorkoutRoutines = (req, res, db) => {
  const { user_id } = req.query; // Fetch user_id from query parameters
  if (!user_id) {
    return res.status(400).json({ error: "User ID is required to fetch workout routines." });
  }

  const query = "SELECT * FROM user_workout_routines WHERE user_id = ?";
  db.query(query, [user_id], (err, results) => {
    if (err) {
      console.error("Error fetching workout routines:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    res.status(200).json(results);
  });
};