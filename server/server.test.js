const request = require('supertest');
const { app, db, server } = require('./index'); // Import app, db, and server

describe('GET /api', () => {
  afterAll((done) => {
    // Close the database connection
    db.end((err) => {
      if (err) {
        console.error('Error closing the database connection:', err);
      } else {
        console.log('Database connection closed.');
      }
    });

    // Close the server
    server.close(done); // Pass the 'done' callback to ensure the server closes before Jest exits
  });

  it('should return a message from the backend', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from the backend!');
  });
});
