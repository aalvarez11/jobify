import Job from '../models/JobModel.js';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/customErrors.js';

// GET ALL
export const getAllJobs = async (req, res) => {
  const jobs = await Job.find({});
  res.status(StatusCodes.OK).json({ jobs });
};

// CREATE JOB
export const createJob = async (req, res) => {
  // TODO: will be adding validation later
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

// GET JOB
export const getJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  // null check
  if (!job) {
    throw new NotFoundError(`no job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

// EDIT JOB
export const updateJob = async (req, res) => {
  const { id } = req.params;
  const updatedJob = await Job.findByIdAndUpdate(id, req.body, { new: true });
  // null check
  if (!updatedJob) {
    throw new NotFoundError(`no job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

// DELETE JOB
export const deleteJob = async (req, res) => {
  const { id } = req.params;
  const removedJob = await Job.findByIdAndDelete(id);
  // null check
  if (!removedJob) {
    throw new NotFoundError(`no job with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });
};
