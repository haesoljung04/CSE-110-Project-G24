import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AddFriend from './pages/AddFriend';


function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:5001/api')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => console.error('Error:', error));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/add-friend" element={<AddFriend />} />
        {/* Other routes */}
      </Routes>
    </Router>
  );
}

export default App;
