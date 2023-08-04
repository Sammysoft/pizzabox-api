import { OtpModel } from "../Models/otp.model.js";
import otpGenerator from "otp-generator";
import bcrypt from "bcrypt";
import { errorMessage } from "../Helpers/utils.js";

export const forgotPasswordService = async (data, res) => {
  try {
    const { email } = data;
    let tokenExists = await OtpModel.findOne({ email: email });
    if (tokenExists === null) {
      const expiryTime = new Date();
      expiryTime.setMinutes(expiryTime.getMinutes() + 5);
      const otp = await otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
      });
      let hashedOtp = await bcrypt.hash(otp, 10);
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
      const otp = await otpGenerator.generate(6, {
        upperCase: false,
        specialChars: false,
        alphabets: false,
      });
      let hashedOtp = await bcrypt.hash(otp, 10);
      tokenExists.otp = hashedOtp;
      tokenExists.expiry = expiryTime;
      tokenExists = await tokenExists.save();
      return tokenExists;
    }
  } catch (error) {
    return errorMessage(400, error._message, null)(res);
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
    const isExpired = await checkExpiry(storedOtp.expiry);
    const isMatch = await bcrypt.compareSync(otp, storedOtp.otp);
    if (isMatch === true && isExpired === false) return true;
    if (
      (isMatch === false && isExpired === true) ||
      (isMatch === true && isExpired === false) ||
      (isMatch === true && isExpired === true)
    )
      return false;
  } catch (error) {
    return errorMessage(400, error._message, null)(res);
  }
};
