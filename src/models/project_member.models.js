import mongoose, { Schema } from "mongoose";

const projectMemberSchema = new mongoose.Schema(
  {
    project_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      enum: ["PROJECT_ADMIN", "MEMBER"],
      default: "MEMBER",
    },
    joined_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: false, 
  }
);
 
projectMemberSchema.index({ project_id: 1, user_id: 1 }, { unique: true });

module.exports = mongoose.model("ProjectMember", projectMemberSchema);