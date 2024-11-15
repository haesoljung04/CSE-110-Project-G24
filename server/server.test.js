// server.test.js
const request = require('supertest');
const { server, db } = require('./index'); // Import the server and db from your server

// Close the server and the database connection after all tests
afterAll((done) => {
  db.end((err) => {
    if (err) {
      console.error('Error closing the database connection:', err);
    } else {
      console.log('Database connection closed.');
    }
    server.close(done); // Close the server after DB connection is closed
  });
});

describe('Server and API Tests', () => {
  
  // Test the API route for fetching a message
  it('should return a message from the backend on GET /api', async () => {
    const res = await request(server).get('/api');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from the backend!');
  });

  // Test POST /api/users - Create or update user
  it('should add or update a user on POST /api/users', async () => {
    const user = {
      auth0_id: 'auth0|testuser123',
      name: 'Test User',
      email: 'testuser@example.com',
    };
    const res = await request(server)
      .post('/api/users')
      .send(user);
    
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('User added or updated');
  });

  // Test POST /api/actions - Record user action
  it('should record user action on POST /api/actions', async () => {
    const userAction = {
      auth0_id: 'auth0|testuser123', // Ensure this user exists in your DB or create before
      action_type: 'exercise',
      action_details: 'User performed 30 push-ups',
    };
    
    const res = await request(server)
      .post('/api/actions')
      .send(userAction);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Action recorded');
  });

  // Test DB connection - This ensures that the connection was properly established
  it('should connect to MySQL database', (done) => {
    db.query('SELECT 1', (err, results) => {
      expect(err).toBeNull();
      expect(results).toBeDefined();
      done();
    });
  });

});
