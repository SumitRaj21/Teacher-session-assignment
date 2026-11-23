const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const sessionRoutes = require('./routes/sessionRoutes');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/health', (_req, res) => res.json({ success: true, message: 'API is running' }));
app.use('/users', userRoutes);
app.use('/sessions', sessionRoutes);
app.use(errorHandler);
module.exports = app;
