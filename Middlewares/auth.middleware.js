import { authMiddlewareService } from "../Services/middleware.service.js";

export const authMiddleware = async (req, res, next) => {
    let header = req?.headers?.authorization;
    let jwtVerifier = await authMiddlewareService(header, res);
    if(!jwtVerifier) return;
    return next();
}