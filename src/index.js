const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("../config/db");
const errorHandler = require("./middleware/error");

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use(errorHandler);

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
