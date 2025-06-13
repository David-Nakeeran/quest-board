import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/authRouter.js";
import questRouter from "./routes/questRouter.js";
import userRouter from "./routes/userRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Needed for httponly cookies
app.use(cookieParser());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/", questRouter);
app.use("/api/", userRouter);

app.use(errorHandler);

app.listen(8080, () => {
  console.log("Server is listening on port 8080...");
});
