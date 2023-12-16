import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const user = await userModel.create({
    username,
    email,
    password: hashedPassword,
  });
  if (!user) return res.status(400).send("Error creating the user");
  res.status(201).json({ msg: "Usre created successfully" });
};
