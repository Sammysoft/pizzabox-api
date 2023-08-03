import mongoose from "mongoose";

const otpSchema = mongoose.Schema(
  {
    email: { type: String, default: null },
    otp: { type: Number, default: null },
    expiry: { type: String },
  },
  { timestamps: true }
);

export const OtpModel = mongoose.model("Otp", otpSchema);
