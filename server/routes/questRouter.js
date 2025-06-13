import express from "express";
import {
  questPost,
  questAttemptPost,
  questGetAvailable,
} from "../controllers/questController.js";
import { authenticateToken } from "../auth/auth.js";

const router = express.Router();

// Routes
router.get("/quests/available", authenticateToken, questGetAvailable);

router.post("/quests", authenticateToken, questPost);

router.post("/quest/:id/complete", authenticateToken, questAttemptPost);

export default router;
