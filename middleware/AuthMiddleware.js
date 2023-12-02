const tokenUtil = require("../utils/TokenUtil")

const authUser = (req,res,next)=>{
    // get the token fomr the header.. bearer token

    const token = req.headers.authorization;
    if(token){
        if(token.startsWith("Bearer ")){
            const tokenValue = token.split(" ")[1];
            const isValidate = tokenUtil.validateToken(tokenValue);
            if(isValidate != null){
                next()
            }
            else{
                res.status(401).json({
                    message:"uh r not authorized"
                })
            }
        }
        else{
            res.status(401).json({
                message:"Gapla kr rha h tu kuch!!"
            })
        }
    }
    else{
        res.status(401).json({
            message:"token hi nahi aaya h bro!"
        })
    }
}

module.exports={
    authUser,
}