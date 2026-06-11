const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const reportRoutes = require("./routes/reportRoutes");
const resultRoutes = require("./routes/resultRoutes");

dotenv.config();

const app = express();

// Connect Database
connectDB()
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

// Middleware
app.use(cors());
app.use(express.json());

// Home Route
app.get("/", (req, res) => {
  res.send("Backend Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", reportRoutes);
app.use("/api", resultRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});