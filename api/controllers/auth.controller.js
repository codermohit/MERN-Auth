import jwt from "jsonwebtoken";
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
  if (!user) throw new Error("Error creating the user");
  res.status(201).json({ msg: "User created successfully" });
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new Error("Please provide email and password");
  const validUser = await userModel.findOne({ email });
  if (!validUser) throw new Error("Invalid credentials");
  const validPassword = bcryptjs.compareSync(password, validUser.password);
  if (!validPassword) throw new Error("Invalid credentials");
  const { password: hashedPassword, ...user } = validUser._doc;
  const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
  res
    .cookie("accessToken", token, {
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    })
    .status(200)
    .json({ user });
};
