import { User } from "../Models/user.model.js";
import bcrypt from "bcrypt";

export const changePasswordService = async (data, password) => {
  try {
    let user = await User.findOne(data);
    let hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user = await user.save();
    return user;
  } catch (error) {
    console.log(error)
    return false;
  }
};
