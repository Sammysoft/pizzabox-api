import express from "express";
import {
  authRegisterController,
  authRegisterUserExists,
  registerRequiredController,
} from "../../Controllers/Auth/auth.controller.js";
import { userMiddleware } from "../../Services/user.middleware.service.js";
import { getUserController } from "../../Controllers/User/user.get.controller.js";
import {
  forgotPasswordController,
  passwordRequiredController,
  verifiedOtpRequiredController,
  verifyOtpController,
} from "../../Controllers/User/user.post.controller.js";
import {
  changePasswordController,
  changePasswordRequiredController,
} from "../../Controllers/User/user.put.controller.js";

const UserRoutes = express.Router();

UserRoutes.post(
  "/onboard",
  registerRequiredController,
  authRegisterUserExists,
  authRegisterController
);

UserRoutes.get("/get", userMiddleware, getUserController);
UserRoutes.post(
  "/request-otp",
  passwordRequiredController,
  userMiddleware,
  forgotPasswordController
);
UserRoutes.post(
  "/verify-otp",
  verifiedOtpRequiredController,
  verifyOtpController
);

UserRoutes.put(
  "/change-password",
  changePasswordRequiredController,
  changePasswordController
);

export default UserRoutes;
