import express from "express";
import { createPost, getAllPosts, getUserPosts } from "../controllers/postController";
import { authToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/create",authToken, createPost);
router.get("/feed", getAllPosts);
router.get("/:id",getUserPosts)


export default router;
