const mongoose = require('mongoose');

const ngoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  location: { type: String, required: true },
  cause: { type: String, required: true },
  description: { type: String, required: true },
  phone: { type: String, default: '' },
  address: { type: String, default: '' },
  needs: { type: String, default: '' },
  status: { type: String, default: 'Active' }
}, {
  timestamps: true
});

module.exports = mongoose.model('NGO', ngoSchema);