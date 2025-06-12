import { db } from "../utils/dbConfig.js";

export const createQuest = async (newQuest) => {
  try {
    const { title, description, difficulty, reward_xp } = newQuest;

    return await db.query(
      `INSERT INTO quests (title, description, difficulty, reward_xp ) VALUES($1, $2, $3, $4)RETURNING *`,
      [title, description, difficulty, reward_xp]
    );
  } catch (error) {
    throw error;
  }
};
