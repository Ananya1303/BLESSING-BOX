const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// Test route to verify the router is working
router.get('/test', (req, res) => {
    res.json({ message: 'Contact routes are working!' });
});

// Get all contact messages
router.get('/', async (req, res) => {
    try {
        console.log('GET /api/contact - Fetching all messages');
        const messages = await Contact.find()
            .sort({ createdAt: -1 })
            .select('-__v');
        
        console.log(`Found ${messages.length} messages`);
        res.json(messages);
    } catch (err) {
        console.error('Error in GET /api/contact:', err);
        res.status(500).json({ 
            error: 'Error fetching messages',
            details: err.message 
        });
    }
});

// Contact form submission
router.post('/', async (req, res) => {
    try {
        console.log('POST /api/contact - Received new message');
        const { name, email, subject, message } = req.body;

        // Validate input
        if (!name || !email || !subject || !message) {
            console.log('Missing required fields');
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create new contact message
        const contact = new Contact({
            name,
            email,
            subject,
            message
        });

        // Save to database
        await contact.save();
        console.log('Message saved successfully');

        res.json({ 
            message: 'Message received successfully',
            contact: { name, email, subject, message }
        });
    } catch (err) {
        console.error('Error in POST /api/contact:', err);
        res.status(500).json({ 
            error: 'Error processing your message',
            details: err.message 
        });
    }
});

// Get a single message by ID
router.get('/:id', async (req, res) => {
    try {
        console.log(`GET /api/contact/${req.params.id} - Fetching single message`);
        const message = await Contact.findById(req.params.id)
            .select('-__v');

        if (!message) {
            console.log('Message not found');
            return res.status(404).json({ error: 'Message not found' });
        }

        console.log('Message found');
        res.json(message);
    } catch (err) {
        console.error('Error in GET /api/contact/:id:', err);
        res.status(500).json({ 
            error: 'Error fetching message',
            details: err.message 
        });
    }
});

// Update message status
router.patch('/:id/status', async (req, res) => {
    try {
        console.log(`PATCH /api/contact/${req.params.id}/status - Updating status`);
        const { status } = req.body;
        
        if (!['new', 'read', 'replied'].includes(status)) {
            return res.status(400).json({ error: 'Invalid status' });
        }

        const message = await Contact.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        ).select('-__v');

        if (!message) {
            console.log('Message not found');
            return res.status(404).json({ error: 'Message not found' });
        }

        console.log('Status updated successfully');
        res.json(message);
    } catch (err) {
        console.error('Error in PATCH /api/contact/:id/status:', err);
        res.status(500).json({ 
            error: 'Error updating message status',
            details: err.message 
        });
    }
});

module.exports = router; 