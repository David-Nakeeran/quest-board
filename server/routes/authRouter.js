import express from "express";
import { loginPost, registerPost } from "../controllers/authController.js";
import { authenticateToken } from "../auth/auth.js";
import {
  validateCharacterName,
  validateEmail,
  validatePassword,
} from "../middleware/validators.js";
import { handleValidationErrors } from "../middleware/handleValidationErrors.js";

const router = express.Router();

// Routes
router.post(
  "/register",
  validateEmail,
  validatePassword,
  validateCharacterName,
  handleValidationErrors,
  registerPost
);

router.get("/login", (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Login get page",
  });
});

router.post(
  "/login",
  validateEmail,
  validatePassword,
  handleValidationErrors,
  loginPost
);

// test protected route
router.get("/protected", authenticateToken, (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Access granted to protected route",
  });
});

export default router;
