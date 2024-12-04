exports.saveWorkoutRoutine = (req, res, db) => {
    const { userId, routine } = req.body;
  
    if (!userId || !Array.isArray(routine)) {
      return res.status(400).json({ error: "Invalid input data" });
    }
  
    const query = `
      INSERT INTO workout_routines (user_id, routine) 
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE routine = ?;
    `;
  
    db.query(query, [userId, JSON.stringify(routine), JSON.stringify(routine)], (err, result) => {
      if (err) {
        console.error("Error saving workout routine:", err);
        return res.status(500).json({ error: "Database error" });
      }
  
      res.status(200).json({ message: "Workout routine saved successfully!" });
    });
  };