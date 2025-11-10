const mongoose = require('mongoose');

const lessonProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  lessonId: { type: String, required: true },
  status: { type: String, enum: ['not_started','in_progress','completed'], default: 'not_started' },
  xpAwarded: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('LessonProgress', lessonProgressSchema);


