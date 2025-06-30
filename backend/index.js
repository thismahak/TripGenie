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




dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: ['http://localhost:3000', 'https://trip-genie-gamma.vercel.app'], // allow both dev & deployed frontend
  credentials: true,
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('🌍 TripGenie Backend is Running');
});

app.use('/api/auth', authRoutes);
app.use('/api/visa', visaRoutes);
app.use('/api/packing', packingRoutes);
app.use('/api/history', historyRoutes);
app.use("/api/explore", exploreRoutes);
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
