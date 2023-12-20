import express from "express";
import { signup, signin, google } from "../controllers/auth.controller.js";
const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);
router.route("/googleLogin").post(google);

export default router;
