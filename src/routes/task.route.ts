import { Router } from "express";
import { taskController } from "../controllers/task.controller";

const router = Router();

router.post("/:userId", taskController.create);
router.get("/", taskController.getAll);
router.patch("/:id/complete", taskController.complete);

export default router;
