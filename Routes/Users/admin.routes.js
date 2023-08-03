import express from "express";
import { adminMiddleware } from "../../Services/admin.middleware.service";

const AdminRoutes = express.Router();

AdminRoutes.get("/get", adminMiddleware)