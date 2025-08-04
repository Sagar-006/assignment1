import { z } from "zod";
import { Request, Response } from "express";
import User from "../models/userModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { Users } from "../types/types";
dotenv.config();

const userSchema = z.object({
  username: z.string().min(4).max(30).trim().optional(),
  email: z.string().min(10).max(50).trim(),
  password: z.string().min(8).max(16).trim(),
  bio:z.string(),
});

const SALT = 10;
const JWT_SECRET = process.env.JWT_SECRET as string;
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const parseResult = userSchema.safeParse(req.body);

    if (!parseResult.success) {
      res.status(400).json({
        message: "Name or password to short",
        issues: parseResult.error,
      });
      return;
    }
    const { username, email, password,bio } = parseResult.data as Users;
    console.log(username,email);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "Email already exists!",
      });
      return;
    }

    const hashPassword = await bcrypt.hash(password, SALT);

    const user = await User.create({
      username,
      email,
      password: hashPassword,
      bio,
    });

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res
      .header("Authorization", `Bearer ${token}`)
      .status(201)
      .json({
        message: "you are signed in",
        token,
        user: {
          username: user.username,
          email: user.email,
        },
      });
  } catch (error) {
    res.status(500).json({
        error:error,
        message:"Something is wrong "
    })
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });
    console.log(user);

    if (!user) {
      res.json({
        message: "User Not Exist!",
      });
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.json({
        message: "Incorrect Password!",
      });
      return;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        email: user.email,
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.header("Authorization", `Bearer ${token}`);

    res.status(201).json({
      message: "Login successfully",
      token,
      user: {
        username: user.username,
        email: user.email,
        userId: user._id,
      },
    });
  } catch (e) {
    res.status(401).json({
      message: e,
    });
  }
};


export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user?.userId;

    const user = await User.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


export const updateUserBio = async (req: Request, res: Response) => {
  try {
    // @ts-ignore
    const userId = req.user?.userId;
    const { bio } = req.body;

    const user = await User.findByIdAndUpdate(
      userId,
      { bio },
      { new: true, runValidators: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Bio updated", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
