const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
//const logger = require("./winston/index.js");
const serverless = require("serverless-http");
const cors = require('cors');

const app = express();
app.use(cors());


connectDB();

app.use(express.json());
app.get("/",(req,res)=>{
  res.send("running");
});
//const PORT = process.env.PORT || 3000;
app.use("/users", require("./routes/user"));
app.use("/verify", require("./routes/verficaltion"));
app.use("/forgetpassword", require("./routes/forgetpassword.js"));
app.use("/admin", require("./routes/admin.js"));
//app.listen(PORT, () => {
  //console.log(`Server running at http://localhost:${PORT}`);
//});


module.exports = serverless(app);