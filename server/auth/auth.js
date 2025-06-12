import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user, secret, expires) => {
  const payload = { userId: user.id };
  return jwt.sign(payload, secret, { expiresIn: expires });
};

export const authenticateToken = (req, res, next) => {
  // Extract access token from the HttpOnly cookie
  try {
    const token = req.cookies.token;

    if (!token) {
      const error = new Error("Access denied, no token provided");
      error.statusCode = 401;
      throw error;
    }

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decoded.userId; // Have attached userId to the req.user object
    next();
  } catch (error) {
    next(error);
  }
};
