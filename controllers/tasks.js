const Task = require("../models/Task");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json(task);
});
const getTask = asyncWrapper(async (req, res) => {
  const taskID = req.params.id;
  const task = await Task.findOne({ _id: taskID });
  if (!task) {
    return res
      .status(404)
      .json({ msg: `Can't find a task with the id :${taskID}` });
  }
  res.status(200).json({ task });
});
const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return res.status(404).json({ msg: `No task with id : ${taskID}` });
  }
  res.status(200).json({ task });
});
const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskID } = req.params;

  const task = await Task.findOneAndDelete({ _id: taskID });
  if (!task) {
    return res.status(404).json({ msg: `taks with id ${taskID} not found` });
  }

  res.status(200).json({ msg: `${task?.name} Deleted successfully` });
});
// const getAllTasks = asyncWrapper(async (req, res) => {
//   try {
//     const tasks = await Task.find({});
//     res.status(200).json({ tasks });
//     // res.status(200).json({ tasks, amount: tasks.length });
//     // res.status(200).json({ success:true,data:{tasks,nbHits:tasks.length}});
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// });
// const createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json(task);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };
// const getTask = async (req, res) => {
//   try {
//     const taskID = req.params.id;
//     const task = await Task.findOne({ _id: taskID });
//     if (!task) {
//       return res
//         .status(404)
//         .json({ msg: `Can't find a task with the id :${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };
// const updateTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;
//     const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!task) {
//       return res.status(404).json({ msg: `No task with id : ${taskID}` });
//     }
//     res.status(200).json({ task });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };
// const deleteTask = async (req, res) => {
//   try {
//     const { id: taskID } = req.params;

//     const task = await Task.findOneAndDelete({ _id: taskID });
//     if (!task) {
//       return res.status(404).json({ msg: `taks with id ${taskID} not found` });
//     }

//     res.status(200).json({ msg: `${task?.name} Deleted successfully` });
//   } catch (error) {
//     res.status(500).json({ msg: error });
//   }
// };

module.exports = {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
