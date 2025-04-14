import mongoose, { Schema, models } from "mongoose";

const userModel = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const User = models.users || mongoose.model("users", userModel);
