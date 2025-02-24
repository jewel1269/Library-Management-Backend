const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRED } = require("../constant");
const verifyToken = require("../middlewares/authMiddleware.js");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email, password);
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).send({
      success: true,
      message: "User created successfully",
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.log("📛 👉 ~ registerUser ~ error:", error);
    res.status(500).send({
      success: false,
      message: "User registration failed",
      error,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRED,
    });
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "User login failed",
      error,
    });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({
      message: "User Profile Get Successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "User Get Successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: "user fetching error",
    });
  }
};

module.exports = { registerUser, loginUser, getUser, getUserProfile };
