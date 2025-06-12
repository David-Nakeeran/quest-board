import { db } from "../utils/dbConfig.js";

export const createUser = async (newUser, password) => {
  try {
    const { email, character_name } = newUser;

    return await db.query(
      `INSERT INTO users (email, password, character_name) VALUES($1, $2, $3)RETURNING *`,
      [email, password, character_name]
    );
  } catch (error) {
    throw error;
  }
};

export const getUserByEmail = async (email) => {
  try {
    return await db.query(`SELECT * FROM users WHERE email = $1`, [email]);
  } catch (error) {
    throw error;
  }
};
