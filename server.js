const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const serverless = require("serverless-http");

const app = express();

connectDB();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("running");
});

// Define your API routes here
app.use("/api/users", require("./routes/user"));
app.use("/api/verify", require("./routes/verficaltion"));
app.use("/api/forgetpassword", require("./routes/forgetpassword.js"));
app.use("/api/admin", require("./routes/admin.js"));

//app.listen(PORT, () => {
  //logger.info(`Server running at http://localhost:${PORT}`);
//});
// Export the app for serverless environment
module.exports = app;
module.exports.handler = serverless(app);  // For Vercel serverless setup
