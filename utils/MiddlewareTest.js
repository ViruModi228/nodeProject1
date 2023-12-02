const testMiddleware = (req, res, next) => {
    console.log('test middleware');
    
    var age = req.body.age;
    if(age<18){
        res.status(401).json({
            message:"you are not eligible"
        })
    }
    else{
        next(); //next.....
    }
}
module.exports = testMiddleware