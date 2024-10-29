import { nanoid } from 'nanoid';

// jobs array with json for sample jobs
let jobs = [
  { id: nanoid(10), company: 'Apple', position: 'Front-End Dev' },
  { id: nanoid(10), company: 'Nintendo', position: 'Game Dev' },
  { id: nanoid(10), company: 'Carousel Boutique', position: 'Tailor' },
];

// GET ALL
export const getAllJobs = async (req, res) => {
  res.status(200).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  const { company, position } = req.body;

  if (!company || !position) {
    return res.status(400).json({ msg: 'please provide company and position' });
  }

  const id = nanoid(10);
  const job = { id, company, position };
  jobs.push(job);

  res.status(201).json({ job });
};

// GET JOB
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  res.status(200).json({ job });
};

// EDIT JOB
export const updateJob = async (req, res) => {
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
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = jobs.find((job) => job.id === id);

  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }

  const newJobs = jobs.filter((job) => job.id !== id);
  jobs = newJobs;

  res.status(200).json({ msg: 'job deleted' });
};
