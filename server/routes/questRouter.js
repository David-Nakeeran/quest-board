import express from "express";
import {
  questPost,
  questAttemptPost,
  questGetAvailable,
  questDelete,
  questGetById,
} from "../controllers/questController.js";
import { authenticateToken } from "../auth/auth.js";

const router = express.Router();

// Routes

// Get
router.get("/quests/available", authenticateToken, questGetAvailable);
router.get("/quests/:id", authenticateToken, questGetById);

// Post
router.post("/quests", authenticateToken, questPost);

router.put("/quests/:id/complete", authenticateToken, questAttemptPost);

// Delete
router.delete("/quests/:id", authenticateToken, questDelete);

export default router;
