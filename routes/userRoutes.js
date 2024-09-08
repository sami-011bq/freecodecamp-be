import { Router } from "express";

import {
  loginUser,
  logoutUser,
  profile,
  refreshAccessToken,
  registerUser,
} from "../controllers/userController.js";
import verifyJwt from "../middlewares/authMiddleware.js";

const router = Router();

// http://localhost:8000/api/v1/users/signup
router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", verifyJwt, logoutUser);
router.post("/refresh-token", refreshAccessToken);
router.get("/profile", verifyJwt, profile);

export default router;
