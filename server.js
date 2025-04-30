const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const logger = require("./winston/index.js");

const app = express();

connectDB();

app.use(express.json());

const PORT = process.env.PORT || 3000;
app.use("/api/users", require("./routes/user"));
app.use("/api/verify", require("./routes/verficaltion"));
app.use("/api/forgetpassword", require("./routes/forgetpassword.js"));
app.use("/api/admin", require("./routes/admin.js"));
app.listen(PORT, (req,res) => {
  logger.info(`Server running at http://localhost:${PORT}`,res.send("Deployed"));
});
