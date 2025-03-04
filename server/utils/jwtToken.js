
export const sendToken = (user,statusCode,res)=>{
    const token = user.getJwtToken()

    const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production", 
        sameSite: "None",
    };

    res.status(statusCode).cookie('token',token,options).json({
        success:true,
        user,
        token
    })
}