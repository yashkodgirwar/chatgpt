import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: String,
  plan: { type: String, default: "free" },
  dailyChatCount: { type: Number, default: 0 },
  lastResetDate: Date
});

export default mongoose.model("User", userSchema);