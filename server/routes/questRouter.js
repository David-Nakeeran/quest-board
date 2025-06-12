import express from "express";
import { questPost } from "../controllers/questController.js";

const router = express.Router();

// Routes
router.post("/quests", questPost);

export default router;
