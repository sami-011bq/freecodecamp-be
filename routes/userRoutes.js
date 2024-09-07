import { Router } from "express";

import { registerUser } from "../controllers/userController.js";

const router = Router();

// http://localhost:8000/api/v1/users/signup
router.post("/signup", registerUser);

export default router;
