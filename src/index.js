const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("../config/db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res, next) => {
  res.status(200).send({ msg: "Hello World" });
});

app.post("/", (req, res, next) => {
  res.status(200).send({
    msg: req.body,
  });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`.blue));
