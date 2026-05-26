const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");
const UserRoutes = require("./routes/UserRoutes");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api/products", UserRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send();
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Started on Port ${PORT}`);
});
