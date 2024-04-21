import express from "express";
import { customError, notFound } from "../helpers/errorHandler";
import authRoutes from "./authRoutes";
import taskRoutes from "./taskRoutes";
import { isAuthenticated } from "../middleware/authMiddleware";


const router = express.Router();

router.use("/auth", authRoutes);
router.use("/task",isAuthenticated, taskRoutes);
router.use(notFound);
router.use(customError);

export default router;