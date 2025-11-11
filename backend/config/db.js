const mongoose = require('mongoose');

module.exports = async function connectDb() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/harmonix';
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, { dbName: 'harmonix' });
};


