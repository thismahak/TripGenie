// routes/profile.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import User from '../models/User.js'; // adjust path based on your structure

const router = express.Router();

router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user).select('name email createdAt'); // Select only necessary fields
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
