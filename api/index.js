import "dotenv/config";
import "express-async-errors";

import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import { errorHandlerMiddleware } from "./middleware/errorHandler.js";
import { notFoundMiddleware } from "./middleware/notFound.js";
mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);
app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected, Server Listening to PORT ${PORT}`);
  } catch (error) {
    console.error(error.message);
  }
});
