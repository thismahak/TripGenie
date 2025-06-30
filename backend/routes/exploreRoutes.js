// /routes/exploreRoutes.js
import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { exploreChain } from "../langchain/exploreChain.js";
import TripRequest from "../models/TripRequest.js";

const router = express.Router();

// ⛳ Auto-save + generate
router.post("/", protect, async (req, res) => {
  const { destination, tripType } = req.body;

  if (!destination) {
    return res.status(400).json({ message: "Destination is required" });
  }

  try {
    const response = await exploreChain.invoke({
      destination,
      tripType: tripType || "Sightseeing",
    });

    const saved = await TripRequest.create({
      userId: req.user,
      destination,
      tripType,
      response: response.content,
      type: "explore", // ✅ ensures correct label in history
    });

    res.json({
      response: response.content,
      savedId: saved._id,
    });
  } catch (err) {
    console.error("Explore Error:", err.message);
    res.status(500).json({ message: "Something went wrong while generating travel info." });
  }
});

export default router;
