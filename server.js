const express = require("express");
require("dotenv").config();
const cors = require("cors");
const connectDB = require("../config/db");
const serverless = require("serverless-http");

const app = express();
app.use(cors());
connectDB();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is live");
});

app.use("/api/users", require("../routes/user"));
app.use("/api/verify", require("../routes/verification")); // fixed typo in filename
app.use("/api/forgetpassword", require("../routes/forgetpassword"));
app.use("/api/admin", require("../routes/admin"));

module.exports.handler = serverless(app);  // ✅ Important for Vercel
