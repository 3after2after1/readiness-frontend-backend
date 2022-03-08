require("dotenv").config();
const mongoose = require(mongoose);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: process.env.DB_NAME,
    });
    console.log("MongoDB connection success");
  } catch (error) {
    console.error("MongoDB connection FAILED");
    process.exit(1);
  }
};

module.exports = connectDB;
