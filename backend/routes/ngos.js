const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const NGO = require('../models/NGO');
const mongoose = require('mongoose');

// Register a new NGO
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, location, cause, description, phone, address } = req.body;
    
    // Log received data
    console.log('Received NGO registration data:', { name, email, location, cause, description });

    // Validate required fields
    const missingFields = [];
    if (!name) missingFields.push('name');
    if (!email) missingFields.push('email');
    if (!password) missingFields.push('password');
    if (!location) missingFields.push('location');
    if (!cause) missingFields.push('cause');
    if (!description) missingFields.push('description');

    if (missingFields.length > 0) {
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}`,
        missingFields 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Check if NGO already exists
    const existingNGO = await NGO.findOne({ email });
    if (existingNGO) {
      return res.status(400).json({ error: 'Email already registered. Please sign in.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new NGO
    const ngo = new NGO({ 
      name, 
      email, 
      password: hashedPassword,
      location,
      cause,
      description,
      phone: phone || '',
      address: address || '',
      needs: '',
      status: 'Active'
    });
    
    await ngo.save();
    console.log('NGO saved successfully:', ngo);

    // Return complete NGO info (excluding password)
    res.status(201).json({ 
      message: 'NGO registered successfully!',
      ngo: {
        id: ngo._id,
        name: ngo.name,
        email: ngo.email,
        phone: ngo.phone || '',
        address: ngo.address || '',
        location: ngo.location || '',
        cause: ngo.cause || '',
        description: ngo.description || '',
        needs: ngo.needs || '',
        status: ngo.status || 'Active'
      }
    });
  } catch (err) {
    console.error('NGO registration error:', err);
    res.status(400).json({ error: err.message });
  }
});

// Get all NGOs
router.get('/', async (req, res) => {
  try {
    console.log('Fetching all NGOs...');
    const ngos = await NGO.find({}, '-password'); // Exclude password field
    console.log(`Found ${ngos.length} NGOs`);
    res.json(ngos);
  } catch (err) {
    console.error('Error fetching NGOs:', err);
    res.status(500).json({ error: 'Error fetching NGOs' });
  }
});

// NGO Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password' });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Please provide a valid email address' });
    }

    // Find NGO by email
    const ngo = await NGO.findOne({ email });
    if (!ngo) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, ngo.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Return NGO info (excluding password)
    res.json({ 
      message: 'Login successful', 
      ngo: { 
        id: ngo._id,
        name: ngo.name,
        email: ngo.email,
        phone: ngo.phone || '',
        address: ngo.address || '',
        location: ngo.location || '',
        cause: ngo.cause || '',
        description: ngo.description || '',
        needs: ngo.needs || '',
        status: ngo.status || 'Active'
      } 
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error. Please try again later.' });
  }
});

// Update NGO needs
router.put('/update-needs/:id', async (req, res) => {
  try {
    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid NGO ID format' });
    }

    const { needs } = req.body;
    const ngo = await NGO.findByIdAndUpdate(
      req.params.id,
      { needs },
      { new: true, runValidators: true }
    );

    if (!ngo) {
      return res.status(404).json({ error: 'NGO not found' });
    }

    res.json({ 
      message: 'Needs updated successfully!', 
      needs: ngo.needs,
      ngo: {
        id: ngo._id,
        name: ngo.name,
        email: ngo.email
      }
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update NGO profile
router.put('/update', async (req, res) => {
  try {
    const { id, email, ...updateData } = req.body;
    
    // Validate required fields
    if (!id || !email) {
      return res.status(400).json({ error: 'Missing required fields: id and email' });
    }

    // Validate if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid NGO ID format' });
    }

    // Find NGO by ID and email (double verification)
    const ngo = await NGO.findOne({ _id: id, email: email });
    if (!ngo) {
      return res.status(404).json({ error: 'NGO not found or email mismatch' });
    }

    // Remove any undefined or null values
    Object.keys(updateData).forEach(key => {
      if (updateData[key] === undefined || updateData[key] === null) {
        delete updateData[key];
      }
    });

    // If no valid data to update
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ error: 'No valid data provided for update' });
    }

    // Update the NGO
    const updatedNGO = await NGO.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password'); // Exclude password from the response

    if (!updatedNGO) {
      return res.status(404).json({ error: 'Failed to update NGO profile' });
    }

    res.json({ 
      message: 'Profile updated successfully!',
      ngo: {
        id: updatedNGO._id,
        name: updatedNGO.name,
        email: updatedNGO.email,
        phone: updatedNGO.phone || '',
        address: updatedNGO.address || '',
        location: updatedNGO.location || '',
        cause: updatedNGO.cause || '',
        description: updatedNGO.description || '',
        needs: updatedNGO.needs || '',
        status: updatedNGO.status || 'Active'
      }
    });
  } catch (err) {
    console.error('Update error:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;