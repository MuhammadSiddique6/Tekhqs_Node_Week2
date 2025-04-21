const express = require("express");
const nodemailer =require("nodemailer");

const otpfun= async(email)=>{
    const otp = Math.floor(1000 + Math.random() * 9000);
    const transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_GMAIL,
        pass: process.env.Email_Password,
      },
    });

    const mailOptions = {
      from: process.env.ADMIN_GMAIL,
      to: email,
      subject: "Your OTP for Signup",
      html: `<h3>Your OTP is: <strong>${otp}</strong></h3>`,
    };

    await transporter.sendMail(mailOptions);
    return otp;
};
module.exports = otpfun;