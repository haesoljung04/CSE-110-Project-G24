const request = require('supertest');
const app = require('../index');

describe('GET /api', () => {
  it('should return a message from the backend', async () => {
    const res = await request(app).get('/api');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Hello from the backend!');
  });
});

// trigger test workflow please