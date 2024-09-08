import { Router } from "express";
import { getCourses, seedCourses } from "../controllers/courseController.js";
import verifyJwt from "../middlewares/authMiddleware.js";

const router = Router();
router.use(verifyJwt); // Apply verifyJwt middleware to all routes of this file

router.get("", getCourses);
router.post("/seed", seedCourses);

export default router;
