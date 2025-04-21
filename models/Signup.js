const timeStamp = require('console');
const mongoose = require('mongoose');

const SignupScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp:{
        type:Number,
        require:true
    },
    verify:{
        type:Boolean,
        require:true
    },
    passverify:{
        type:Boolean,
        require:true
    }
}, 
{
    timestamps: true 
});

module.exports = mongoose.model('signup', SignupScheme);