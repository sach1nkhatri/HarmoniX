const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDb = require('./config/db');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/progress', require('./routes/progressRoutes'));

app.get('/health', (req, res) => res.json({ ok: true }));

const PORT = process.env.PORT || 4000;

connectDb().then(() => {
  app.listen(PORT, () => console.log(`HarmoniX backend running on :${PORT}`));
}).catch(err => {
  console.error('DB connection failed', err);
  process.exit(1);
});


