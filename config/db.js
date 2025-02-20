const mongoose = require("mongoose");

const connectDB = async (uri) => {
  if (!uri) {
    console.error(" --- ## --- MONGODB_URI is not set in env --- ## ---");
    process.exit(1);
  }
  try {
    const conn = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
