import { TaskType } from "@/redux/taskSlice";

import mongoose from "../../../config/db";

export interface TaskDocument extends mongoose.Document {
  deadline: string;
  description: string;
  priority: string;
  status: string;
  title: string;
  createdBy: mongoose.Schema.Types.ObjectId;
}

export const TaskSchemaType = {
  title: String,
  description: String,
  status: String,
  priority: String,
  deadline: Date,
  createdBy: mongoose.Schema.Types.ObjectId,
};

const TaskSchema = new mongoose.Schema<TaskDocument>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      required: true,
    },
    deadline: {
      type: String,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Task =
  mongoose.models.Task || mongoose.model<TaskDocument>("Task", TaskSchema);

export default Task;
