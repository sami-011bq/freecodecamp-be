import { Router } from "express";
import { seedCourses } from "../controllers/courseController.js";

const router = Router();

router.post("/seed", seedCourses);

export default router;
