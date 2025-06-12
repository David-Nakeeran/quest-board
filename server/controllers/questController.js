import { createQuest } from "../services/questService.js";

// GET /quests
// View all uncompleted quests

// GET /quests/:id:
// get quest by id

// POST /quests
// Create a new quest
export const questPost = async (req, res, next) => {
  try {
    const userId = req.user;
    // Save quest in database
    const result = await createQuest(req.body, userId);

    if (result.rows.length === 0) {
      throw new Error("Quest not created");
    }

    res
      .status(201)
      .json({ success: true, message: "Quest created successfully" });
  } catch (error) {
    next(error);
  }
};

// POST /quests/:id/complete
// Attempt a quest
export const questAttemptPost = async (req, res, next) => {
  try {
    const questId = req.params;
    const userId = req.user;

    // get quest by id
    // check success = false
    // check userId is'nt the same as in the quest user_id

    // update quest table success true and completed_by userid
    // update user table with xp granted
    // Save quest in database
    const result = await createQuest(req.body, userId);

    if (result.rows.length === 0) {
      throw new Error("Quest not created");
    }

    res
      .status(201)
      .json({ success: true, message: "Quest created successfully" });
  } catch (error) {
    next(error);
  }
};

// PUT /quests/:id
// Update a quest

// DELETE /quests/:id:
// Delete a quest

// The quest_completions table is only updated when a user attempts/completes a quest
