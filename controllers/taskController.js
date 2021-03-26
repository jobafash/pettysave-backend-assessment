/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable eqeqeq */
import asyncHandler from 'express-async-handler';
import Task from '../models/taskModel.js';
import User from '../models/userModel.js';

// @desc    Fetch all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const user = req.user;
  let tasks = await Task.find({ user: user._id });
  const queryStatus = req.query.status;

  if (queryStatus) {
    tasks = tasks.filter((task) => task.status == queryStatus);
  }
  res.status(200).json({ tasks });
});

// @desc    Fetch single task
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ id: req.params.id });

  if (task) {
    const author = await User.findById(task.user);
    // eslint-disable-next-line prefer-destructuring
    const user = req.user;
    if (user.email != author.email) {
      res.status(401).json({ error: 'Not authorized to view this task' });
    }
    res.status(200).json(task);
  } else {
    res.status(404).json('Task not found');
  }
});

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findOne({ id: req.params.id });

  if (task) {
    const author = await User.findById(task.user);
    // eslint-disable-next-line prefer-destructuring
    const user = req.user;
    if (user.email != author.email) {
      res.status(401).json({ error: 'Not authorized to delete this task' });
    }
    await task.remove();
    res.status(200).json({ message: 'Task removed' });
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

// @desc    Create a task
// @route   POST /api/tasks
// @access  Private
const createTask = asyncHandler(async (req, res) => {
  // eslint-disable-next-line prefer-destructuring
  const user = req.user;
  const task = new Task({
    title: req.body.title,
    user,
    status: 'pending',
    description: req.body.description,
  });

  const createdTask = await task.save();
  res.status(201).json({
    message: 'Task created',
    id: createdTask.id,
    title: createdTask.title,
    description: createdTask.description,
    status: createdTask.status,
    createdBy: `${user.first_name} ${user.last_name}`,
    createdAt: createdTask.createdAt,
    updatedAt: createdTask.updatedAt,
  });
});

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  const {
    title,
    status,
    description,
  } = req.body;

  const task = await Task.findOne({ id: req.params.id });

  if (task) {
    const author = await User.findById(task.user);
    // eslint-disable-next-line prefer-destructuring
    const user = req.user;
    if (user.email != author.email) {
      res.status(401).json({ error: 'Not authorized to edit this task' });
    }

    task.title = title;
    task.status = status;
    task.description = description;

    const updatedTask = await task.save();
    res.status(200).json(updatedTask);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

export {
  getTasks,
  getTaskById,
  deleteTask,
  createTask,
  updateTask,
};
