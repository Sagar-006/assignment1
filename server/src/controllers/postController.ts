import { Request, Response } from "express";
import Post from "../models/postModel";
import User from "../models/userModel";

// create
export const createPost = async (req: Request, res: Response) => {
  try {
    const { content } = req.body;
    //@ts-ignore
    const user = req.user.userId;
    console.log(user);

    if (!content || content.trim() === "") {
      return res.status(400).json({ message: "Content is required" });
    }

    const newPost = await Post.create({
      content,
      author: user,
    });

    res.status(201).json({ message: "Post created", post: newPost });
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
};

// get All Posts
export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

// get user posts
export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const posts = await Post.find({ author: userId }).sort({ createdAt: -1 });

    res.json({ user: { username: user.username, bio: user.bio }, posts });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user posts", error });
  }
};
