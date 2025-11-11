const User = require('../models/User');

exports.register = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });
  // demo only: store hash-less (do not use in production)
  try {
    const user = await User.create({ email, passwordHash: password });
    res.status(201).json({ id: user._id, email: user.email });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || user.passwordHash !== password) return res.status(401).json({ message: 'invalid credentials' });
  res.json({ id: user._id, email: user.email, xp: user.xp, streak: user.streak });
};

exports.me = async (req, res) => {
  res.json({ ok: true });
};


