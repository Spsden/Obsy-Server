const Task = require("../models/task");
const asyncWrapper = require("../middleware/async_wrapper");
const DataNotFound = require("../errors/data_not_found");
const task = require("../models/task");
const { StatusCodes } = require("http-status-codes");
const {runCronTask} = require("../utils/cronutil")

const getAllTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.userId }).sort(
    "createdAt"
  );

  res.status(StatusCodes.OK).json({ tasks, count: tasks.length });
};
function haha(task) {
  console.log(task)
  
}

const createTask = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const task = await Task.create(req.body);

  try {
   // haha(task);
    runCronTask(task);
    
    
  } catch (e) {
    console.log(e)
    
  }
  res.status(StatusCodes.CREATED).json({ task });
};

const getTask = async (req, res) => {
  const {
    user: { userId },
    params: { id: taskID },
  } = req;
  // const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID, createdBy: userId });
  if (!task) {
    throw new DataNotFound(`No task with id ${id}`);
  }
  res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
  const {
    body: { body },
    user: { userId },
    params: { id: taskId },
  } = req;
  console.log(body);

  for (let key in body) {
    if (body.hasOwnProperty(key)) {
      if (body[key] === "") {
        throw new BadRequestError(` ${key} field(s) cannot be empty`);
      }
    }
  }
  // console.log("yaha aya")

  //console.log(req.body)
  try {
    // const { id: taskId } = req.params;
    const task = await Task.findByIdAndUpdate(
      { _id: taskId, createdBy: userId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!task) {
      throw new DataNotFound(`No task with ${taskId}`);
    }
    res.status(StatusCodes.OK).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const deleteTask = async (req, res) => {
  try {
    const {
      user: { userId },
      params: { id: taskID },
    } = req;
    const task = await Task.findByIdAndRemove({
      _id: taskID,
      createdBy: userId,
    });

    if (!task) {
      throw new DataNotFound(`No task with id : ${taskId}`);
    }

    res.status(StatusCodes.OK).json({ task });
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
