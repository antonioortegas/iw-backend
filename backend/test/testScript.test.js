require('dotenv').config();
const axios = require('axios');
const mongoose = require('mongoose');
const app = require('../src/app');

// MongoDB connection setup
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://admin:admin@localhost:27017/exam?authSource=admin';
const API_URL = 'http://localhost:3002';

// Connect to MongoDB and start express server before all tests are run
beforeAll(async () => {
  await mongoose.connect(MONGODB_URI);
  server = await app.listen(3002);
  console.log('Connected to MongoDB');
  console.log('Server started');
});

// Close MongoDB and express server after all tests are run
afterAll(async () => {
  await mongoose.connection.close();
  await server.close();
  console.log('Disconnected from MongoDB');
  console.log('Server closed');
});

// EXAMPLE Test suite, get all users in /api/users
describe('GET /api/users', () => {
  test('It should respond with an array of users', async () => {
    const response = await axios.get(`${API_URL}/api/users`);
    expect(response.data).toBeInstanceOf(Array);
  });
});
