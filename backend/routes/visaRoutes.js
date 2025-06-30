import express from "express";
import { visaChain } from "../langchain/borderwiseChain.js";
import { protect } from "../middleware/authMiddleware.js";
import TripRequest from "../models/TripRequest.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { nationality, destination, tripType } = req.body;

  if (!nationality || !destination || !tripType) {
    return res.status(400).json({ error: "Missing input fields" });
  }

  try {
    const aiResponse = await visaChain.invoke({
      nationality,
      destination,
      tripType,
    });

    // Save to DB with only the string content
    const saved = await TripRequest.create({
      userId: req.user,
      nationality,
      destination,
      tripType,
      response: aiResponse.content, // ✅ FIXED
      type: "visa",
    });

    res.json({
      result: aiResponse.content, // ✅ FIXED
      savedId: saved._id,
    });

  } catch (err) {
    console.error("Visa chain error:", err.message);
    res.status(500).json({ error: "AI failed to respond" });
  }
});

export default router;
