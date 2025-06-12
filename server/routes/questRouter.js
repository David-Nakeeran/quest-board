import express from "express";
import { questPost, questAttemptPost } from "../controllers/questController.js";
import { authenticateToken } from "../auth/auth.js";

const router = express.Router();

// Routes
router.post("/quests", authenticateToken, questPost);

router.post("/quest/:id/complete", authenticateToken, questAttemptPost);

export default router;
