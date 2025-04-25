const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/Signup");

exports.verifytoken = async (req, res, next) => {
  const token = req.header("Authorization") || req.header;

  if (!token) {
    return res.status(400).send("Unauthorized user. Token not provided.");
  }

  let bearerToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

  try {
    const decodedToken = jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.user = decodedToken;

    const user = await User.findOne({ email: decodedToken.email });

    if (!user || user.token !== bearerToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token (mismatch).",
      });
    } else {
      next();
    }
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};
