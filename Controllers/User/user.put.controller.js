import { isRequired } from "../../Helpers/required.js";
import { errorMessage, successMessage } from "../../Helpers/utils.js";
import { changePasswordService } from "../../Services/profile.service.js";

export const changePasswordRequiredController = (req, res, next) => {
  const data = { email: req?.body?.email, password: req?.body?.password };
  if (!isRequired(data, res)) return;
  return next();
};

export const changePasswordController = async (req, res, next) => {
  const { password, email } = req?.body;
  let user = await changePasswordService({ email: email }, password);
  user = { full_name: user.full_name, email: user.email };
  if (user) return successMessage(200, "Password Changed!", user)(res);
  if (!user)
    return errorMessage(400, "Oops, could not change password!", null)(res);
};
