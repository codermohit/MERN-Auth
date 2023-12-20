import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptjs.hashSync(password, 10);
  const user = await User.create({
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
  const validUser = await User.findOne({ email });
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

export const google = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    const { password: hashedPassword, ...rest } = user._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    return res
      .cookie("access_token", token, {
        httpOnly: true,
        expires: expiryDate,
      })
      .status(200)
      .json({ user: rest });
  } else {
    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);

    const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);

    const newUser = new User({
      username:
        req.body.name.split(" ").join("").toLowerCase() +
        Math.floor(Math.random() * 10000).toString(),
      email: req.body.email,
      password: hashedPassword,
      profilePicture: req.body.photo,
    });

    await newUser.save();
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
    const { password: hashedPassword2, ...rest } = newUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);
    res
      .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
      .status(200)
      .json({ user: rest });
  }
};
