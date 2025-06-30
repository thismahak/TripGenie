import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import TripRequest from '../models/TripRequest.js';

const router = express.Router();

// GET /api/history
router.get('/', protect, async (req, res) => {
  try {
    const history = await TripRequest
      .find({ userId: req.user })
      .select("type destination tripType nationality response createdAt") // ✅ Cleaner
      .sort({ createdAt: -1 });

    res.json({ count: history.length, history });
  } catch (err) {
    console.error('Error fetching history:', err.message);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
});

export default router;
