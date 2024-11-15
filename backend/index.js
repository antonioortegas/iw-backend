require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/examdb';

const app = express();
app.use(express.json());

const userRouter = require('./src/routers/userRouter');
const eventRouter = require('./src/routers/eventRouter');

app.use('/api/users', userRouter);
app.use('/api/events', eventRouter);

console.log('Connecting to database:', MONGODB_URI);
mongoose.connect(MONGODB_URI,)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('Database connection error:', error);
    });