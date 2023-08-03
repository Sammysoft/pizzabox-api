import express from "express";
import {
  authLoginController,
  loginRequiredController,
} from "../../Controllers/Auth/auth.controller.js";

const AuthenticateRoute = express.Router();

AuthenticateRoute.post("/auth", loginRequiredController, authLoginController);

export default AuthenticateRoute;
