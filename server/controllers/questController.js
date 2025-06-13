import {
  createQuest,
  getQuestById,
  updateQuestSuccess,
  getAvailableQuests,
  deleteSingleUserQuest,
} from "../services/questService.js";
import { getUserById, updateUserSuccess } from "../services/userService.js";

// GET /quests/available
// View all uncompleted quests
export const questGetAvailable = async (req, res, next) => {
  try {
    const userId = req.user;
    // Save quest in database
    const result = await getAvailableQuests(false, userId);

    if (result.rows.length === 0) {
      throw new Error("No quests available");
    }

    const availableQuests = result.rows;

    res.status(201).json({ success: true, quests: availableQuests });
  } catch (error) {
    next(error);
  }
};

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
    const { id } = req.params;
    const userId = req.user;

    // get quest by id
    const result = await getQuestById(parseInt(id));

    // get user by id
    const userResult = await getUserById(parseInt(userId));

    if (result.rows.length === 0) {
      const error = new Error("Quest not found");
      error.statusCode = 404;
      throw error;
    }

    if (userResult.rows.length === 0) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const quest = result.rows[0];
    const user = userResult.rows[0];

    if (quest.success) {
      return res
        .status(200)
        .json({ success: false, message: "Quest has already been completed" });
    }

    // check userId isn't the same as in the quest user_id
    if (userId === quest.user_id) {
      return res.status(200).json({
        success: false,
        message: "Can not attempt to complete a quest created by yourself",
      });
    }

    // Refactor this all later
    // dice roll
    const diceRoll = Math.floor(Math.random() * 100) + 1;

    // get difficulty from quest table
    const difficulty = quest.difficulty;

    const difficulties = {
      easy: 80,
      medium: 50,
      hard: 20,
    };

    for (const [key, value] of Object.entries(difficulties)) {
      if (key === difficulty && diceRoll <= value) {
        await updateQuestSuccess(quest.id, user.id, true);

        await updateUserSuccess(quest.reward_xp, user.id);

        return res.status(200).json({
          success: true,
          message: "Quest completed!",
        });
      }
    }

    res.status(200).json({ success: false, message: "Quest attempt failed" });
  } catch (error) {
    next(error);
  }
};

// PUT /quests/:id
// Update a quest

// DELETE /quests/:id
// Delete a quest
export const questDelete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    const result = await deleteSingleUserQuest(id, userId);

    if (result.rowCount === 0) {
      const error = new Error("No quest found");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ success: true, message: "Quest deleted successfully" });
  } catch (error) {
    next(error);
  }
};
