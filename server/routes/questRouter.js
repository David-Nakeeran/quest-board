import express from "express";
import {
  questPost,
  questAttemptPost,
  questGetAvailable,
  questDelete,
} from "../controllers/questController.js";
import { authenticateToken } from "../auth/auth.js";

const router = express.Router();

// Routes

// Get
router.get("/quests/available", authenticateToken, questGetAvailable);

// Post
router.post("/quests", authenticateToken, questPost);

router.post("/quest/:id/complete", authenticateToken, questAttemptPost);

// Delete
router.delete("/quests/:id", authenticateToken, questDelete);

export default router;
