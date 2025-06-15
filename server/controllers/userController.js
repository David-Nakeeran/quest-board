import { getUserDetails } from "../services/userService.js";
import { getAllUserQuests } from "../services/questService.js";
// GET /users
// user details
export const userGetDetails = async (req, res, next) => {
  try {
    const userId = req.user;

    const result = await getUserDetails(userId);

    if (result.rows.length === 0) {
      const error = new Error("User does not exist");
      error.statusCode = 404;
      throw error;
    }

    const user = result.rows[0];

    res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
};

export const userGetQuests = async (req, res, next) => {
  try {
    const userId = req.user;

    const result = await getAllUserQuests(userId);

    const quests = result.rows;

    res.status(200).json({ success: true, quests });
  } catch (error) {
    next(error);
  }
};
