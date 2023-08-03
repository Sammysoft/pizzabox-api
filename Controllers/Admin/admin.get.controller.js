import { errorMessage, successMessage } from "../../Helpers/utils";

export const adminContentController = async (req, res, next) => {
  const user = await findUserByService({ _id: req?.params?.userID });
  if (user) return successMessage(200, "User", user)(res);
  if (!user) return errorMessage(400, "Error Fetching Resource", null)(res);
};
