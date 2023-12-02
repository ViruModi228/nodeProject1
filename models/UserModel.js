const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
    },
    age:{
        type:Number,
    },
    //department is a reference to department model
    department:{
        type:Schema.Types.ObjectId,
        ref:"department" //model name
    },
    userRoles:[
        {
            type:Schema.Types.ObjectId,
            ref:"role" //model name
        }
    ]
    
    
})
module.exports = mongoose.model("user",userSchema)


// {
//     "name":"ajay",
//     "age":25,
//     "email":"neha@gmail.com",
//     "department":"653d033fe4b09100ea62c086",
//     "userRole":"653d06aaddfb99d45ed860cf"
// }