import mongoose, { Schema } from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    due_date: {
      type: Date,
    },
  },
  {
    timestamps: true, 
  }
);

module.exports = mongoose.model("Task", taskSchema);