import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
mongoose.set("strictQuery", true);

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected, Server Listening to PORT ${PORT}`);
  } catch (error) {
    console.error(error.message);
  }
});
