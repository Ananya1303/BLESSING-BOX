const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

// Test route
router.post('/test', (req, res) => {
    console.log('Blog test route hit');
    res.json({ message: 'Blog routes are working' });
});

// Debug middleware
router.use((req, res, next) => {
    console.log(`Blog Route accessed: ${req.method} ${req.url}`);
    console.log('Request body:', req.body);
    next();
});

// Get all blogs
router.get('/', async (req, res) => {
    try {
        console.log('Fetching all blogs...');
        const blogs = await Blog.find().sort({ createdAt: -1 });
        console.log(`Found ${blogs.length} blogs`);
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({
            message: 'Error fetching blogs',
            error: error.message
        });
    }
});

// Get featured blogs
router.get('/featured', async (req, res) => {
    try {
        console.log('Fetching featured blogs...');
        const featuredBlogs = await Blog.find({ featured: true }).sort({ createdAt: -1 });
        console.log(`Found ${featuredBlogs.length} featured blogs`);
        res.json(featuredBlogs);
    } catch (error) {
        console.error('Error fetching featured blogs:', error);
        res.status(500).json({
            message: 'Error fetching featured blogs',
            error: error.message
        });
    }
});

// Get blogs by category
router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;
        console.log(`Fetching blogs for category: ${category}`);
        const blogs = await Blog.find({ category }).sort({ createdAt: -1 });
        console.log(`Found ${blogs.length} blogs in category ${category}`);
        res.json(blogs);
    } catch (error) {
        console.error('Error fetching blogs by category:', error);
        res.status(500).json({
            message: 'Error fetching blogs by category',
            error: error.message
        });
    }
});

// Get single blog by ID
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        console.log(`Fetching blog with ID: ${id}`);
        const blog = await Blog.findById(id);
        
        if (!blog) {
            console.log(`Blog not found with ID: ${id}`);
            return res.status(404).json({
                message: 'Blog not found',
                id: id
            });
        }

        console.log('Blog found:', blog);
        res.json(blog);
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({
            message: 'Error fetching blog',
            error: error.message
        });
    }
});

// Create new blog
router.post('/', async (req, res) => {
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

// Update blog (admin only)
router.put('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json(blog);
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(400).json({ message: 'Error updating blog', error: error.message });
    }
});

// Delete blog (admin only)
router.delete('/:id', async (req, res) => {
    try {
        const blog = await Blog.findByIdAndDelete(req.params.id);
        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        res.json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Error deleting blog', error: error.message });
    }
});

module.exports = router; 