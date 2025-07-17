const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database connected Successfully ✅");
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { connectDB };
