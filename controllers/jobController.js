import { nanoid } from 'nanoid';
import Job from '../models/JobModel.js';

// jobs array with json for sample jobs
let jobs = [
  { id: nanoid(10), company: 'Apple', position: 'Front-End Dev' },
  { id: nanoid(10), company: 'Nintendo', position: 'Game Dev' },
  { id: nanoid(10), company: 'Carousel Boutique', position: 'Tailor' },
];

// GET ALL
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(200).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  // TODO: will be adding validation later
  const job = await Job.create(req.body);
  res.status(201).json({ job });
};

// GET JOB
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  // null check
  if (!job) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ job });
};

// EDIT JOB
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  // null check
  if (!updatedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ msg: 'job modified', job: updatedJob });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  // null check
  if (!removedJob) {
    return res.status(404).json({ msg: `no job with id ${id}` });
  }
  res.status(200).json({ msg: 'job deleted', job: removedJob });
};
