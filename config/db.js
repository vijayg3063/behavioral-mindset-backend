const mongoose = require("mongoose");

console.log("db.js loaded");

async function connectDB() {
  try {
    console.log("connectDB function called");

    const uri = process.env.MONGODB_URI;

    await mongoose.connect(uri);

    console.log("MongoDB connected");
    console.log("Ready State:", mongoose.connection.readyState);
  } catch (err) {
    console.error("MongoDB Error:", err);
  }
}

module.exports = connectDB;