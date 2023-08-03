import { OtpModel } from "../Models/otp.model.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";

export const forgotPasswordService = async (data, res) => {
  try {
    const { email } = data;
    let tokenExists = await OtpModel.findOne({ email: email });
    if (!tokenExists) {
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 5);
      const otp = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
      });
      let hashedOtp = bcrypt.hash(otp, 10);
      let newOtp = await new OtpModel({
        email,
        otp: hashedOtp,
        expiry: expiryTime,
      });
      newOtp = await newOtp.save();
      return newOtp;
    } else {
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 5);
      const otp = otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
      });
      let hashedOtp = bcrypt.hash(otp, 10);
      tokenExists.otp = hashedOtp;
      tokenExists.expiry = expiryTime;
      tokenExists = await tokenExists.save();
      return tokenExists;
    }
  } catch (error) {
    return false;
  }
};

export const checkExpiry = async (time) => {
  const currentTime = new Date();
  const otpTime = new Date(time);
  if (currentTime > otpTime) return true;
  if (currentTime < otpTime) return false;
};

export const VerifyOtpService = async (data, res) => {
  try {
    const { otp, email } = data;
    let storedOtp = await OtpModel.findOne({ email: email });
    const isExpired = checkExpiry(storedOtp.expiry);
    const isMatch = await bcrypt.compare(storedOtp.otp, otp);
    if (isMatch && isExpired === false) return true;
    if (!isMatch && isExpired === true) return false;
  } catch (error) {
    return false;
  }
};
