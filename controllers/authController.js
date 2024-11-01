import User from '../models/UserModel.js';
import { StatusCodes } from 'http-status-codes';
import { hashPassword } from '../utils/passwordUtils.js';

export const register = async (req, res) => {
  // give admin to first db user
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? 'admin' : 'user';
  // encrypt pass
  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;
  // create user
  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: 'user created' });
};
export const login = async (req, res) => {
  res.send('register');
};
