import mongoose, { Schema } from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",  
      required: true,
    },
  },
  {
    timestamps: true,  
  }
);
 

export const Project = mongoose.model("Project", projectSchema);