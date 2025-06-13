import express from "express";
import { userGetDetails } from "../controllers/userController.js";
import { authenticateToken } from "../auth/auth.js";

const router = express.Router();

// Routes
router.get("/users", authenticateToken, userGetDetails);

export default router;
