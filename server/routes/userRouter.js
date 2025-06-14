import express from "express";
import {
  userGetDetails,
  userGetQuests,
} from "../controllers/userController.js";
import { authenticateToken } from "../auth/auth.js";

const router = express.Router();

// Routes
router.get("/users", authenticateToken, userGetDetails);

router.get("/users/quests", authenticateToken, userGetQuests);

export default router;
