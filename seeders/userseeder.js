const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const UserModel = require("../models/Signup");
const connectDB = require("../config/db");
async function seedAdmin() {
  // Connect to the database
  connectDB();
  // Check if admin already exists
  const existingAdmin = await UserModel.findOne({ role: "SuperAdmin" });

  if (!existingAdmin) {
    // Create admin credentials
    const adminCredentials = {
      role: "SuperAdmin",
      name: "SuperAdmin",
      email: "superadmin@gmail.com",
      password: "superadmin123",
      otp: null,
      verify: true,
      passverify: true,
      otpexpiry: null,
      status: true,
    };

    const hashedPassword = await bcrypt.hash(adminCredentials.password, 10);
    adminCredentials.password = hashedPassword;

    await UserModel.create(adminCredentials);

    console.log("Admin user created successfully");
  } else {
    console.log("Admin user already exists");
  }
  await mongoose.disconnect();
}

seedAdmin()
  .then(() => {
    console.log("Admin seeding completed");
    process.exit(0);
  })
  .catch((err) => {
    console.error("Error seeding admin:", err);
    process.exit(1);
  });
