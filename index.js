const express = require("express");
const mongoose = require("mongoose");
const connectDB = require("./config/db.js");
const dotenv = require("dotenv");
const cors = require("cors")
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const loanRoutes = require("./routes/loanRoutes");
const adminRoutes = require("./routes/adminRoutes.js");
const authMiddleware = require("./middlewares/authMiddleware");
dotenv.config();

const app = express();
dotenv.config();

// Connect to MongoDB
const URI = process.env.MONGO_URI;

connectDB(URI);

app.use(express.json());
app.use(cors({
  origin:["http://localhost:5173", "http://localhost:3000"]
}))

// Routes
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
// Protected routes
app.use("/api/books", authMiddleware, bookRoutes);
app.use("/api/loans", authMiddleware, loanRoutes);

//test route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Library management on going",
  });
});
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
