const express = require("express");
const dotenv = require("dotenv");

const connectDB = require("./config/db");
const userRoutes = require("./routes/UserRoutes");
const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const cors = require("cors");

// Load .env
dotenv.config();

// Initialize Express
const app = express();
// Enable CORS
app.use(cors());

// Middleware
app.use(express.json());

// Database Connection
connectDB();

// Routes
app.use("/", userRoutes);

// Server
app.listen(process.env.PORT, () => {
    console.log(`Server Started on Port ${process.env.PORT}`);
});