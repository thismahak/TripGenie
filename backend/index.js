// /server/index.js

import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import visaRoutes from './routes/visaRoutes.js';
import packingRoutes from './routes/packingRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import exploreRoutes from './routes/exploreRoutes.js';
import profileRoutes from './routes/profileRoute.js';

import rateLimit from 'express-rate-limit'; // ✅ NEW


dotenv.config();

const app = express();
app.set("trust proxy", 1);
// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://trip-genie-gamma.vercel.app'], // allow both dev & deployed frontend
  credentials: true,
}));
app.use(express.json());
const aiLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // limit each IP to 5 requests per windowMs
  message: 'Too many AI requests. Please wait and try again later.',
});

// Routes
app.get('/', (req, res) => {
  res.send('🌍 TripGenie Backend is Running');
});

app.use('/api/auth', authRoutes);
app.use('/api/visa',aiLimiter, visaRoutes);
app.use('/api/packing', aiLimiter,packingRoutes);
app.use('/api/history', historyRoutes);
app.use("/api/explore",aiLimiter, exploreRoutes);
app.use('/api/profile', profileRoutes);

// Mongo + Server Start
const PORT = process.env.PORT || 5000;
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('✅ MongoDB Connected');
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.error('MongoDB Error:', err.message));
