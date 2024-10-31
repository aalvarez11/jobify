import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
  // give admin to first db user
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  // encrypt pass
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  req.body.password = hashedPassword;
  // create user
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};
export const login = async (req, res) => {
  res.send('register');
};
