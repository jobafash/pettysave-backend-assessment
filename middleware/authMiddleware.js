/* eslint-disable no-console */
/* eslint-disable import/extensions */
/* eslint-disable prefer-destructuring */
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization
    && req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[2];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findOne({ user_id: decoded.id }).select('-password');

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ error: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ error: 'Not authorized, no token' });
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: 'Not authorized, as an admin' });
  }
};

export { protect, admin };
