const Task = require("../model/taskModel");
const catchAsync = require("../utils/catchAsync");

exports.createTask = catchAsync(async (req, res, next) => {
  req.body.user = req.user._id;
  const newTask = await Task.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      task: newTask,
    },
  });
});

exports.updateTask = catchAsync(async (req, res, next) => {
  //   req.body.user = req.user.id;
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});

exports.deleteTask = catchAsync(async (req, res, next) => {
  await Task.findByIdAndDelete(req.params.id);

  res.status(200).json({ status: "success", data: null });
});

exports.allTask = catchAsync(async (req, res, next) => {
  const users = await Task.find();

  res.status(200).json({
    status: "success",
    result: users.length,
    data: {
      users,
    },
  });
});
