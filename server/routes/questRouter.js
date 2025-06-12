import express from "express";
import { questPost } from "../controllers/questController.js";
import { authenticateToken } from "../auth/auth.js";

const router = express.Router();

// Routes
router.post("/quests", authenticateToken, questPost);

export default router;
