import { Router } from "express";
import passport from "../config/passport.js";
import { googleLogin } from "../controllers/userController.js";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleLogin
);

export default router;
