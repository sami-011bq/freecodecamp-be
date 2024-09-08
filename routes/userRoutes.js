import { Router } from "express";

import {
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/userController.js";

const router = Router();

// http://localhost:8000/api/v1/users/signup
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/refresh-token", refreshAccessToken);

export default router;
