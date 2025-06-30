import express from "express";
import { packingChain } from "../langchain/packsmartChain.js";
import { protect } from "../middleware/authMiddleware.js";
import TripRequest from "../models/TripRequest.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { destination, durationDays, season, activities } = req.body;

  if (!destination || !durationDays || !season || !activities) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const aiResponse = await packingChain.invoke({
      destination,
      durationDays,
      season,
      activities: activities.join(", "),
    });

    const saved = await TripRequest.create({
      userId: req.user,
      destination,
      response: aiResponse.content, // ✅ FIXED
      type: "packing",
    });

    res.json({
      result: aiResponse.content, // ✅ FIXED
      savedId: saved._id,
    });
  } catch (err) {
    console.error("Packing chain error:", err.message);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

export default router;
