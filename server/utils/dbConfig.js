import { Pool } from "pg";
import dotenv from "dotenv";
dotenv.config();

// DB connection
export const db = new Pool({
  connectionString: process.env.DB_CONNECTION,
});
