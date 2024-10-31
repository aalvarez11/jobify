import 'express-async-errors';
import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import jobRouter from './routes/jobRouter.js';
import mongoose from 'mongoose';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';

// Enable dotenv
dotenv.config();

// Instantiate the application with the express framework
const app = express();

// Node environment check to return morgan metrics
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enables Json
app.use(express.json());

// Examples for express requests
app.get('/', (req, res) => {
  res.send('Hello World');
});

// routers
app.use('/api/v1/jobs', jobRouter);

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
