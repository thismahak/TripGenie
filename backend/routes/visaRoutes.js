import express from "express";
import { visaChain } from "../langchain/borderwiseChain.js";
import { protect } from "../middleware/authMiddleware.js";
import TripRequest from "../models/TripRequest.js";

const router = express.Router();

router.post("/", protect, async (req, res) => {
  const { nationality, destination, tripType } = req.body;

  if (!nationality || !destination || !tripType) {
    return res.status(400).json({ message: "Missing input fields" });
  }

  try {
    const aiResponse = await visaChain.invoke({
      nationality,
      destination,
      tripType,
    });

    // ✅ SAFE extraction of AI text
    const aiText =
      typeof aiResponse === "string"
        ? aiResponse
        : aiResponse?.content ||
          aiResponse?.text ||
          aiResponse?.kwargs?.content ||
          JSON.stringify(aiResponse);

    // ✅ Save to DB
    const saved = await TripRequest.create({
      userId: req.user,
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
    console.error("Visa chain error:", err);
    res.status(500).json({
      message: "AI failed to respond",
    });
  }
});

export default router;
