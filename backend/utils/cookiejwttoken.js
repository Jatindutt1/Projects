//creating tokrn and saving in cookie
const sendToken =(user,statuscode,res)=>{

    const token = user.generateToken();
    //optin for cookie
    const option ={
        expires: new Date(
            Date.now() + process.env.COOKIES_EXPIRE *24*60*60*1000 //for time to expire cookie
        ),
        httpOnly:true,
    };
    res.status(statuscode).cookie('token',token,option).json({
        success:true,
        user,
        token,
    })
    
}

module.exports = sendToken;