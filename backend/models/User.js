const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  displayName: { type: String },
  xp: { type: Number, default: 0 },
  streak: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);


