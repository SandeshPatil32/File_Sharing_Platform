const express = require("express");
const cors = require("cors");
const connectDatabase = require("./config/db");
const dotenv = require("dotenv");

const app = express();

app.use(cors());
app.use(express.json());

connectDatabase();

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

app.use("/api/files", require("./routes/file"));
app.use("/uploads", express.static("uploads"));

const PORT = 8000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
