const express = require("express");
const colors = require("colors");
const connectDB = require("../config/db");
const errorHandler = require("./middleware/error");
const path = require("path");
const cors = require("cors");

// Routes
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");

if (process.env.NODE_ENV === "production") {
  const dotenv = require("dotenv");
  dotenv.config();
}
const app = express();
connectDB();

// Route middleware
app.use(cors());
app.use(express.json());
app.use("/public", express.static(path.join(__dirname, "uploads")));
app.use("/api/auth", authRoutes);
app.use("/api/auth/admin", adminRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/user/cart", cartRoutes);
app.use(errorHandler);

app.get("/", (req, res, next) => {
  res.status(200).send({ msg: "Hello World" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`.blue));
