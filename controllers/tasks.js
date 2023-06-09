const Task = require("../models/task");
const asyncWrapper = require("../middleware/async_wrapper");
const DataNotFound = require("../errors/data_not_found");
const task = require("../models/task");
const { StatusCodes } = require("http-status-codes");

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );

  res.status(StatusCodes.OK).json({ tasks,count:tasks.length });
};

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId
  const task = await Task.create(req.body);
  res.status(StatusCodes.CREATED).json({ task });
};

const getTask = async (req, res) => {

  const {
    user: { userId },
    params: { id: taskID },
  } = req
 // const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID,createdBy:userId });
  if (!task) {
    throw new DataNotFound(`No task with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      throw new DataNotFound(`No task with ${taskId}`);
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });

    if (!task) {
      throw new DataNotFound(`No task with id : ${taskId}`);
    }

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
