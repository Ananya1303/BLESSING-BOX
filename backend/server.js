const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');

// Import routes
const userRoutes = require('./routes/users');
const ngoRoutes = require('./routes/ngos');
const contactRoutes = require('./routes/contact');
const blogRoutes = require('./routes/blogs');

const app = express();
const PORT = process.env.PORT || 5000;

// Basic middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

// Register routes
app.use('/api/users', userRoutes);
app.use('/api/ngos', ngoRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/blogs', blogRoutes);

// Test route
app.get('/api/test', (req, res) => {
    res.json({ message: 'API is working!' });
});

// Static files
app.use(express.static(path.join(__dirname, '../frontend')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blessingbox')
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Basic route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// 404 handler
app.use((req, res) => {
    console.log('404 - Route not found:', req.method, req.url);
    res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Available routes:');
    console.log('- POST /api/ngos/register');
    console.log('- POST /api/ngos/login');
    console.log('- PUT /api/ngos/update');
    console.log('- GET /api/ngos');
    console.log('- POST /api/blogs');
    console.log('- GET /api/blogs');
    console.log('- GET /api/blogs/featured');
    console.log('- GET /api/blogs/category/:category');
});