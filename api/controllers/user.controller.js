import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const updateUser = async (req, res) => {
  if (req.user.id !== req.params.id) {
    return res.status(401).json("You can update only your account!");
  }
  if (req.body.password) {
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        profilePicture: req.body.profilePicture,
      },
    },
    { new: true }
  );
  const { password, ...user } = updatedUser._doc;
  res.status(200).json(user);
};
