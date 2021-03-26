import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const taskSchema = mongoose.Schema(
  {
    id: {
      type: String,
      default: uuidv4(),
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
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
      enum: ['pending', 'in-progress', 'completed'],
      default: 'pending',
    },
  },
  {
    timestamps: true,
  },
);

const Task = mongoose.model('Task', taskSchema);

export default Task;
