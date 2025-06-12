import { db } from "../utils/dbConfig.js";

export const createQuest = async (newQuest, userId) => {
  try {
    const { title, description, difficulty, reward_xp } = newQuest;

    return await db.query(
      `INSERT INTO quests (title, description, difficulty, reward_xp, user_id ) VALUES($1, $2, $3, $4, $5)RETURNING *`,
      [title, description, difficulty, reward_xp, userId]
    );
  } catch (error) {
    throw error;
  }
};

export const getQuestById = async (id) => {
  try {
    return await db.query(`SELECT * FROM quests WHERE id = $1`, [id]);
  } catch (error) {
    throw error;
  }
};
