import express from "express";
import { deleteUser, updateUser } from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.route("/update/:id").post(verifyToken, updateUser);
router.route("/delete/:id").delete(verifyToken, deleteUser);

export default router;
