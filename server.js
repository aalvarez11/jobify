import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import { nanoid } from 'nanoid';

// Enable dotenv
dotenv.config();

// Instantiate the application with the express framework
const app = express();

// Create jobs array with json for sample jobs
let jobs = [
  { id: nanoid(), company: 'Apple', position: 'Front-End Dev' },
  { id: nanoid(), company: 'Nintendo', position: 'Game Dev' },
  { id: nanoid(), company: 'Carousel Boutique', position: 'Tailor' },
];

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

app.post('/', (req, res) => {
  console.log(req);
  res.json({ message: 'data received', data: req.body });
});

// Read Operations
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

// Check for Production or Development port
const port = process.env.PORT || 5100;

// Log a message while the server is running
app.listen(port, () => {
  console.log(`server running on PORT ${port}...`);
});
