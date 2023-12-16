import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
const PORT = process.env.PORT || 3000;
const app = express();

app.use("/api/user", userRoutes);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected, Server Listening to PORT ${PORT}`);
  } catch (error) {
    console.error(error.message);
  }
});
