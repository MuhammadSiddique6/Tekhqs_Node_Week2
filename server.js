const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const logger = require("./winston/index.js");
const serverless = require("serverless-http");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(express.json());

// Basic test route
app.get("/", (req, res) => {
  res.send("API is live");
});

// API routes
app.use("/api/users", require("./routes/user"));
app.use("/api/verify", require("./routes/verficaltion"));
app.use("/api/forgetpassword", require("./routes/forgetpassword.js"));
app.use("/api/admin", require("./routes/admin.js"));

// Local dev: listen on port
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    logger.info(`Server running at http://localhost:${PORT}`);
  });
}

// Export for Vercel serverless
module.exports = serverless(app);
