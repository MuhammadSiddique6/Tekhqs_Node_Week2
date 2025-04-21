const  otp = async (req,res)=>{
    const otp = Math.ceil(Math.random() * 10000);
    console.log(otp);
}

module.exports = otp;