require('dotenv').config();
const express = require('express');
const userRouter = require('./routers/userRouter');
const eventRouter = require('./routers/eventRouter');

const app = express();
app.use(express.json());

// Define routes
app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

module.exports = app;
