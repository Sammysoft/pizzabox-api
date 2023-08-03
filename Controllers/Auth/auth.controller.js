import {
  successMessage,
  errorMessage,
  emailValidatorHelper,
} from "../../Helpers/utils.js";
import { isRequired } from "../../Helpers/required.js";
import { getUserByEmailService } from "../../Services/auth.service.js";
import { authRegisterAccountService } from "../../Services/auth.service.js";
import bcrypt from "bcrypt";
import { jwtService, jwtVerifyService } from "../../Services/auth.service.js";

export const registerRequiredController = (req, res, next) => {
  const data = {
    email: req?.body?.email,
    password: req?.body?.password,
    full_name: req?.body?.full_name,
  };

  if (!isRequired(data, res)) return;
  if (!emailValidatorHelper(req.body.email, res)) return;
  next();
};

/**
 * Check if user exists with same data.. email
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param next ... Express next
 */
export const authRegisterUserExists = async (req, res, next) => {
  const user = await getUserByEmailService(req.body.email, res, true);
  if (user) return errorMessage(409, "This user already exists", user._id)(res);
  return next();
};

/**
 * AUTH ... REGISTER
 * Register controller ... Register a user... (admin, students, teachers, etc)
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param next ... Express next
 */

export const authRegisterController = async (req, res, next) => {
  const { email, password, full_name } = req.body;
  let user = await authRegisterAccountService(
    {
      email,
      password,
      full_name,
    },
    res
  );
    if (!user) return errorMessage(400, "Could not register user", null)(res);
    if (user) return successMessage(201, "User Registered", user)(res);
};

export const loginRequiredController = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!isRequired(data, res)) return;
  next();
};
/**
 * AUTH... LOGIN
 * Login controller ... Login a user... (admin, students, teachers, etc)
 * @param {Request} req Express request object
 * @param {Response} res Express response object
 * @param next ... Express next
 */
export const authLoginController = async (req, res, next) => {
  let user = await getUserByEmailService(req.body.email, res);
  if (!user) return;
  let decrypt = await bcrypt.compareSync(req.body.password, user.password);
  if (!decrypt) return errorMessage(401, "Invalid Credentials", req.body)(res);

  let id = user;

  const token = jwtService({
    id: id?._id,
    email: id?.email,
    is_admin: id?.is_admin
  });
  return successMessage(200, "Logged in", { token })(res);
};
