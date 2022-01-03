const express = require("express");
const {
  signup,
  login,
  protect,
  updatePassword,
} = require("../controllers/authController");
const { getMe, updateMe } = require("../controllers/userController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);

// router.use(protect);

router.get("/me", protect, getMe);
router.patch("/updateMe", updateMe);
router.patch("/updatePassword", updatePassword);

module.exports = router;
