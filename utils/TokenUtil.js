const jwt = require('jsonwebtoken')

const secret = 'secret';

const generateToken = (user)=>{
    const token = jwt.sign(user,secret,{
        expiresIn: "1h",
        algorithm: 'HS512'
    })
    return token;
    // console.log(token);
}
// console.log('hi')
// console.log(generateToken({id:1,"name":"Viral Vani!"}))
const validateToken=(token)=>{
    try{
        const user = jwt.verify(token,secret);
        return user;
    }
    catch(err){
        console.log(err);
        return null;
    }
}
module.exports={generateToken,validateToken}