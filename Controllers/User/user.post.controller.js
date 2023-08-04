import { isRequired } from "../../Helpers/required.js";
import { errorMessage, successMessage } from "../../Helpers/utils.js";
import {
  VerifyOtpService,
  forgotPasswordService,
} from "../../Services/forgotpassword.service.js";

export const passwordRequiredController = async (req, res, next) => {
  const { email } = req?.body
  if (!isRequired({ email: email }, res)) return;
  return next();
};

export const forgotPasswordController = async (req, res, next) => {
  let otp = await forgotPasswordService({ email: req?.body?.email });
  if (otp) successMessage(200, "OTP created successfully", null)(res);
  if (!otp) errorMessage(400, "Could not generate OTP, please contact support");
};

export const verifiedOtpRequiredController = (req, res, next) => {
  if (!isRequired({ otp: req?.body?.otp, email: req?.body?.email }, res))
    return false;
  return next();
};

export const verifyOtpController = async (req, res, next) => {
  let verifiedOtp = await VerifyOtpService(
    { otp: req?.body?.otp, email: req?.body?.email },
    res
  );
  if (verifiedOtp === true) return successMessage(200, "Otp Verified!", null)(res);
  if (verifiedOtp === false)
    return errorMessage(400, "Oops, OTP expired, request another!", null)(res);
};
