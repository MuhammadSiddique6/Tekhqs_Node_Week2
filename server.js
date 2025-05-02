const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
//const logger = require("./winston/index.js");
const serverless = require("serverless-http");

const app = express();

connectDB();

app.use(express.json());
app.get("/",(req,res)=>{
  res.send("running");
});
//const PORT = process.env.PORT || 3000;
app.use("/api/users", require("./routes/user"));
app.use("/api/verify", require("./routes/verficaltion"));
app.use("/api/forgetpassword", require("./routes/forgetpassword.js"));
app.use("/api/admin", require("./routes/admin.js"));
//app.listen(PORT, () => {
  //console.log(`Server running at http://localhost:${PORT}`);
//});

module.exports = app;
module.exports.handler = serverless(app);