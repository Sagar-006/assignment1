import mongoose, { Schema, Document } from "mongoose";
import { required } from "zod/mini/index.cjs";

export interface IPost extends Document {
  content: string;
  author: mongoose.Types.ObjectId;
  createdAt: Date;
}

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IPost>("Post", postSchema);
