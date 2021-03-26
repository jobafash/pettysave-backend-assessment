/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
import dotenv from 'dotenv';
import users from './data/users.js';
import tasks from './data/tasks.js';
import User from './models/userModel.js';
import Task from './models/taskModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Task.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleTasks = tasks.map((task) => ({ ...task, user: adminUser }));

    await Task.insertMany(sampleTasks);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Task.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
