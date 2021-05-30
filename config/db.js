const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.hcqem.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
  );
  console.log(
    "Connected to MongoDB host: ".green +
      `${conn.connection.host}`.green.inverse
  );
};

module.exports = connectDB;
