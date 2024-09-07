import { Router } from "express";

import { loginUser, registerUser } from "../controllers/userController.js";

const router = Router();

// http://localhost:8000/api/v1/users/signup
router.post("/signup", registerUser);
router.post("/login", loginUser);

export default router;
