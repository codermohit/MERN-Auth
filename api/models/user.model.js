import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "Please provide username"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "please enter the email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
    },
    profilePicture: {
      type: String,
      default:
        "https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg",
    },
  },
  { timestamps: true }
);

export default model("User", userSchema);
