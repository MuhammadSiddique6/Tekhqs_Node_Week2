const mongoose = require('mongoose');
require("dotenv").config();
const dbConnects = async () => {  
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB Connection Error:", err.message);
        process.exit(1);
    }
};

module.exports = dbConnects;
