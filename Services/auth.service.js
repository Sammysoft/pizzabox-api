import { errorMessage } from "../Helpers/utils.js";
import { User } from "../Models/user.model.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
import jwt from "jsonwebtoken";

export const saveUserService = async (data, res) => {
  try {
    let user = await new User(data);
    user = await user.save();
    return user;
  } catch (error) {
    return errorMessage(400, error._message)(res);
  }
};

export const getUserByEmailService = async (email, res, bool = false) => {
  try {
    let user = await User.findOne({ email });
    if (!bool && !user) return errorMessage(400, "Invalid Credentials")(res);
    if (user) return user;
  } catch (error) {
    return errorMessage(400, error._message)(res);
  }
};
export const getUserByService = async (find, res, bool = false) => {
  try {
    let user = await User.findOne(find);
    return user;
  } catch (error) {
    return errorMessage(400, error._message)(res);
  }
};

export const jwtService = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

export const jwtVerifyService = async (token) => {
  try {
    let ver = jwt.verify(token, SECRET_KEY);
    return ver;
  } catch (e) {
    console.log("Jwt Verification Failed");
    return false;
  }
};

export const authRegisterAccountService = async (data, res) => {
  const { email, password, full_name } = data;
  let encrypted = await bcrypt.hash(password, 10);
  data.password = encrypted;
  try {
    let user = new User(data);
    await user.save();
    return user;
  } catch (error) {
    return errorMessage(409, error._message, error)(res);
  }
};
