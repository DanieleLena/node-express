const Job = require('../models/job');
const{StatusCodes} = require('http-status-codes');
const { BadRequestError, NotFoundError } = require("../errors");

const getAllJob = async (req, res) => {
  const jobs = await Job.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({ jobs,count: jobs.length });

};
const getJob = async (req, res) => {
  const {user:{userId}, params:{id:jobId}} = req;
console.log(req);

  const job = await Job.findOne({
    _id:jobId,createdBy:userId
  });
  if(!job){
    throw new NotFoundError(`Not found a job with ${jobId} id`)
  }
  res.status(StatusCodes.OK).json({job})
};
const createJob = async(req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body);
  res.status(StatusCodes.CREATED).json({job});
};

const updateJob = async  (req, res) => {
  res.send("update job");
};
const deleteJob = async  (req, res) => {
  res.send("delete job");
};


module.exports = {
  getAllJob,
  getJob,
  createJob,
  updateJob,
  deleteJob
};
