import mongoose, { model } from "mongoose";
import { required } from "zod/mini/index.cjs";

const user = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bio: { type: String, required: true },
    avatarUrl: {
      type: String,
      default:
        "https://i.pinimg.com/1200x/31/48/3a/31483ae532b39d1dfd135a9bcce45616.jpg",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const User = mongoose.model("users", user);

export default User;
