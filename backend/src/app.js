require('dotenv').config();
const express = require('express');

const taskRouter = require('./routers/taskRouter');
const colaboradoresRouter = require('./routers/collaboratorRouter');

const app = express();
app.use(express.json());

app.use('/api/tasks', taskRouter);
app.use('/api/collaborators', colaboradoresRouter);

module.exports = app;
