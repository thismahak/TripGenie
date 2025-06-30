// /server/models/TripRequest.js
import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // Common fields
  destination: String,
  response: String,
  tripType: String,
  type: {
    type: String,
    enum: ["visa", "packing", "explore"], // ✅ added "explore"
    required: true,
  },

  // Visa-specific
  nationality: String,

  // Packing-specific
  durationDays: Number,
  season: String,
  activities: [String],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("TripRequest", tripSchema);
