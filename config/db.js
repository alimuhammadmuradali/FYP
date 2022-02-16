const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      `mongodb+srv://alimuhammad:honda123@cluster0.1c7oh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    );

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (e) {
    console.log(e.toString());
  }
};

module.exports = connectDB;
