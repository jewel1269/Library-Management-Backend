const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_EXPIRED } = require("../constant");
const Admin = require("../models/adminModel.js");

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email);
    const hashedPassword = await bcrypt.hash(password, 10);

    const exitAdmin = await Admin.findOne({ email });
    if (exitAdmin) {
      return res.status(400).send({
        success: false,
        message: "Admin with this email already exists",
      });
    }

    const newAdmin = await Admin.create({
      name,
      email,
      password: hashedPassword,
    });

    res.status(201).send({
      success: true,
      message: "Admin created successfully",
      data: {
        id: newAdmin._id,
        name: newAdmin.name,
        email: newAdmin.email,
      },
    });
  } catch (error) {
    console.log("📛 👉 ~ registerAdmin ~ error:", error);
    res.status(500).send({
      success: false,
      message: "Admin registration failed",
      error,
    });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || !(await bcrypt.compare(password, admin.password))) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: JWT_EXPIRED,
    });
    res.status(200).send({
      success: true,
      message: "Admin logged in successfully",
      data: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Admin login failed",
      error,
    });
  }
};

const findAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) {
      return res.status(404).send({
        success: false,
        message: "Admin not found",
      });
    }
    res.status(200).send({
      success: true,
      data: admin,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Admin not found",
      error,
    });
  }
};

module.exports = { registerAdmin, loginAdmin, findAdmin };
