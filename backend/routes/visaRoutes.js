import express from "express";
import { getVisaInfo } from "../langchain/borderwiseChain.js";
import { protect } from "../middleware/authMiddleware.js";
import TripRequest from "../models/TripRequest.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { nationality, destination, tripType } = req.body;

  if (!nationality || !destination || !tripType) {
    return res.status(400).json({ message: "Missing input fields" });
  }

  try {
    // ✅ DIRECT Gemini call (NO LangChain)
    const aiText = await getVisaInfo({
      nationality,
      destination,
      tripType,
    });

    // ✅ Save to DB
    const saved = await TripRequest.create({
      userId: req.user._id, // IMPORTANT
      nationality,
      destination,
      tripType,
      response: aiText,
      type: "visa",
    });

    // ✅ Send response
    res.status(200).json({
      result: aiText,
      savedId: saved._id,
    });

  } catch (err) {
    console.error("Visa AI error:", err);
    res.status(500).json({
      message: "AI failed to respond",
    });
  }
});

export default router;
