import { errorMessage } from "../Helpers/utils";
import { authMiddlewareService } from "./middleware.service";
import { findAdminByService } from "./user.service";

export const adminMiddleware = async (req, res, next) => {
    let header = req.headers.authorization;
    let jwtVerifier = await authMiddlewareService(header, res);
    if(!jwtVerifier) return;
    if (jwtVerifier.is_admin === false)
        return errorMessage(401, "Authorization Denied")(res);
    req.user = jwtVerifier.id;
    req.admin = await findAdminByService({_id: jwtVerifier.id})
    return next();
}