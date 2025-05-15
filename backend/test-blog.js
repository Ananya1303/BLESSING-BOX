const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Blog = require('./models/Blog');

const app = express();
const PORT = 5001; // Using a different port to avoid conflicts

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Debug middleware
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

// Test route
app.post('/test', (req, res) => {
    console.log('Test route hit');
    res.json({ message: 'Test route working' });
});

// Blog routes
app.post('/blogs', async (req, res) => {
    try {
        console.log('Attempting to create new blog...');
        console.log('Request body:', req.body);
        
        const blog = new Blog(req.body);
        const savedBlog = await blog.save();
        console.log('Blog saved successfully:', savedBlog);
        
        res.status(201).json(savedBlog);
    } catch (error) {
        console.error('Error creating blog:', error);
        res.status(400).json({
            message: 'Error creating blog',
            error: error.message
        });
    }
});

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/blessingbox', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('MongoDB connected successfully');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

// Start server
app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
    console.log('Available routes:');
    console.log('- POST /test');
    console.log('- POST /blogs');
}); 