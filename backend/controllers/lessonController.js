const LessonProgress = require('../models/LessonProgress');

exports.getProgress = async (req, res) => {
  const userId = req.query.userId;
  const list = await LessonProgress.find({ userId });
  res.json(list);
};

exports.updateProgress = async (req, res) => {
  const { userId, lessonId, status, xpAwarded } = req.body;
  const doc = await LessonProgress.findOneAndUpdate(
    { userId, lessonId },
    { status, xpAwarded },
    { new: true, upsert: true }
  );
  res.json(doc);
};


