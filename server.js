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

// GET ALL JOBS
app.get('/api/v1/jobs', (req, res) => {
  res.status(200).json({ jobs });
});

// CREATE JOB
app.post('/api/v1/jobs', (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }

  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);

  res.status(201).json({ job });
});

// GET JOB
app.get('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(200).json({ job });
});

// EDIT JOB
app.patch('/api/v1/jobs/:id', (req, res) => {
  // check request body for company and position fields
  const { company, position } = req.body;
  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }

  // check if a job with the id exists
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  // both checks pass so update job info
  job.company = company;
  job.position = position;
  res.status(200).json({ msg: 'job modified', job });
});

// DELETE JOB
app.delete('/api/v1/jobs/:id', (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: 'job deleted' });
});

// Check for Production or Development port
const port = process.env.PORT || 5100;

// Log a message while the server is running
app.listen(port, () => {
  console.log(`server running on PORT ${port}...`);
});
