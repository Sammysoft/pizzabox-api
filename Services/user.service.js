import { User } from "../Models/user.model.js";
import { errorMessage } from "../Helpers/utils.js";

export const formatUserService = async (data) => {
  const { profile_img, full_name, email, _id, _v, is_admin, ...others } =
    data._doc;
    
  return {
    id: _id,
    profile: {
      profile_img: profile_img ? profile_img : null,
      full_name: full_name ? full_name : null,
      email: email ? email : null,
      is_admin: is_admin
    },
  };
};

export const findUserByService = async (data) => {
  try {
    let user = await User.findById(data);
    if (!user) return errorMessage(400, "User account not Found")(res);
    if (user) return formatUserService(user);
  } catch (error) {
    return false;
  }
};
