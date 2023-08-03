import { isRequired } from "../../Helpers/required.js";
import { errorMessage, successMessage } from "../../Helpers/utils.js";
import { changePasswordService } from "../../Services/profile.service.js";

export const changePasswordRequiredController = (req, res, next) => {
  const data = { email: req?.body?.email, password: req?.body?.password };
  if ((!isRequired(data), res)) return;
  return next();
};

export const changePasswordController = async (req, res, next) => {
  const { password, email } = req?.body;
  let user = await changePasswordService({ email: email }, password);
  if (user) return successMessage(200, "Password Changed!");
  if (!user) return errorMessage(400, "Oops, could not change password!");
};
