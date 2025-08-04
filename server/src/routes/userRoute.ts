import express from "express";
import { getUserProfile, login, signup, updateUserBio } from "../controllers/userController";
import { authToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.get("/profile", authToken, getUserProfile);

router.put("/profile", authToken, updateUserBio);

export default router;
