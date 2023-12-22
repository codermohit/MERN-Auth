import express from "express";
import {
  signup,
  signin,
  google,
  signout,
} from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/googleLogin").post(google);
router.route("/signout").get(signout);

export default router;
