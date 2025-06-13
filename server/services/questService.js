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

export const updateQuestSuccess = async (questId, userId, success) => {
  try {
    await db.query(
      `
      UPDATE quests SET success = $1, completed_by = $2 WHERE id = $3
      `,
      [success, userId, questId]
    );
  } catch (error) {
    throw error;
  }
};

export const getAvailableQuests = async (condition, userId) => {
  try {
    return await db.query(
      `SELECT * FROM quests WHERE success = $1 AND user_id != $2`,
      [condition, userId]
    );
  } catch (error) {
    throw error;
  }
};

export const deleteSingleUserQuest = async (questId, userId) => {
  try {
    return await db.query(`DELETE FROM quests WHERE id = $1 AND user_id = $2`, [
      questId,
      userId,
    ]);
  } catch (error) {
    throw error;
  }
};
