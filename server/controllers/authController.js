import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "../services/userService.js";
import { generateToken } from "../auth/auth.js";
import dotenv from "dotenv";
dotenv.config();

export const registerPost = async (req, res, next) => {
  try {
    // Hash password before saving
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Save user in database
    const result = await createUser(req.body, hashedPassword);

    if (result.rows.length === 0) {
      throw new Error("User not created");
    }

    res
      .status(201)
      .json({ success: true, message: "User registered successfully" });
  } catch (error) {
    next(error);
  }
};

export const loginPost = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await getUserByEmail(email);

    if (result.rows.length === 0) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = generateToken(user, process.env.TOKEN_SECRET, "15m");

    res.cookie("token", token, {
      httpOnly: true,
      // secure: true // Set to true for HTTPS connections only
      sameSite: "None",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logoutPost = async (req, res, next) => {
  try {
    const userId = req.user;

    if (!userId) {
      const error = new Error("Logout failed");
      error.statusCode = 401;
      throw error;
    }

    res.clearCookie("token", {
      httpOnly: true,
      // secure: true // Set to true for HTTPS connections only
      sameSite: "None",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};
