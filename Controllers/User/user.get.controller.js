import { errorMessage, successMessage } from "../../Helpers/utils.js";
import { findUserByService } from "../../Services/user.service.js";

export const getUserController = async (req, res, next) => {
  const user = await findUserByService({ _id: req.userData.id });
  if (user) return successMessage(200, "User", user)(res);
  if (!user) return errorMessage(400, "Error Fetching Resource", null)(res);
};
