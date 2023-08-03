import { jwtVerifyService } from "./auth.service.js";
import { errorMessage } from "../Helpers/utils.js";


let isError = function (e) {
  return e && e.stack && e.message;
};

export const authMiddlewareService = async (header, res) => {
  if (!header || header === "")
    return errorMessage(400, "No token provided")(res);
  header = header.replace("Bearer ", "");

  let jwtVerifier = await jwtVerifyService(header);

  if (isError(jwtVerifier)) throw jwtVerifier;

  if (!jwtVerifier) return errorMessage(400, "Authorization Failed")(res);

  return jwtVerifier;
};
