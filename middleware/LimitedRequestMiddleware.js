const employeeModel = require('../models/EmployeeModel')

const LimitedRequestMiddleware = async (req, res, next) => {
    console.log('count check middleware');
    
    var id = req.params.id;
    const flag = await employeeModel.findById(req.params.id);

    if(flag.count > 0){
        console.log("counts left : ",flag.count)
        next();
    }
    else{
        return res.status(429).json({
            message:"Payment Kro toh kuch ho ab!"
        })
    }
}
module.exports = LimitedRequestMiddleware