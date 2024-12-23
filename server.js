import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import jobRouter from './routes/jobRouter.js';
import authRouter from './routes/authRouter.js';
import userRouter from './routes/userRouter.js';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';

// Enable dotenv
dotenv.config();

// Instantiate the application with the express framework
const app = express();

// Node environment check to return morgan metrics
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

// Public file access
const __dirname = dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.resolve(__dirname, './client/dist')));

// Activate cookie parser
app.use(cookieParser());

// Enables Json
app.use(express.json());

// Enable helmet and mongo sanitize
app.use(helmet());
app.use(mongoSanitize());

// routers
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);
app.use('/api/v1/auth', authRouter);

// point to app frontend
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/dist', 'index.html'));
});

// Not Found middleware that should catch 404 for all routes non-existing routes
app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

// Error middleware
app.use(errorHandlerMiddleware);

// Check for Production or Development port
const port = process.env.PORT || 5100;

try {
  await mongoose.connect(process.env.MONGO_URL);
  // Log a message while the server is running
  app.listen(port, () => {
    console.log(`server running on PORT ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
