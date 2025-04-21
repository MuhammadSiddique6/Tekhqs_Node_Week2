const express = require("express");
const connectDB = require("./config/db");
const app = express();
require("dotenv").config();

connectDB();

app.use(express.json()); 

const PORT = process.env.PORT || 3000
app.use("/api/users", require("./routes/user"));         
app.use("/api/verify",require("./routes/verficaltion"))
app.use("/api/forgetpassword",require("./routes/forgetpassword.js"))

app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`);
});