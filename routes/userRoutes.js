const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
  getUserProfile,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", getUser);
router.get("/profile", authMiddleware, getUserProfile);

module.exports = router;
