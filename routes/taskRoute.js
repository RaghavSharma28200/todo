const express = require("express");
const { protect } = require("../controllers/authController");
const {
  createTask,
  updateTask,
  deleteTask,
  allTask,
} = require("../controllers/taskController");

const router = express.Router();

router.get("/", allTask);
router.use(protect);

router.post("/", createTask);
router.route("/:id").patch(updateTask).delete(deleteTask);

module.exports = router;
