import { Router } from "express";
import userRoutes from "./user.route";
import taskRoutes from "./task.route";

const router = Router();

router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

export default router;
