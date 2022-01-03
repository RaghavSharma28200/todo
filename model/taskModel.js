const mongoose = require("mongoose");

const taskSchema = mongoose.Schema({
  task: {
    type: String,
    trim: true,
    required: [true, "Please write something to add on todo"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "task must belong to a user"],
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
