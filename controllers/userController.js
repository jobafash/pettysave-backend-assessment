/* eslint-disable import/extensions */
import asyncHandler from 'express-async-handler';
import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password.toString()))) {
    res.status(200).json({
      user_id: user.user_id,
      first_name: user.first_name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.user_id),
    });
  } else {
    res.status(401).json({ error: 'Invalid email or password' });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    // eslint-disable-next-line camelcase
    first_name, last_name, email, address, password,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400).json({ error: 'User already exists' });
  }

  const user = await User.create({
    first_name,
    last_name,
    email,
    address,
    password,
  });

  if (user) {
    res.status(201).json({
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      address: user.address,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user.user_id),
    });
  } else {
    res.status(400).json({ error: 'Invalid user data' });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.user_id);

  if (user) {
    user.first_name = req.body.first_name || user.first_name;
    user.last_name = req.body.last_name || user.last_name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      user_id: updatedUser.user_id,
      first_name: updatedUser.first_name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser.user_id),
    });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'User removed' });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.first_name = req.body.first_name || user.first_name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      user_id: updatedUser.user_id,
      first_name: updatedUser.first_name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

export {
  authUser,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
