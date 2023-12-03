const e = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;      // we have to create this Schema in order to take only valid entries in our database

const employeeSchema = new Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    count:{
        type:Number,
        // required:true
    }
})

// now we have to create model for database

module.exports = mongoose.model("employee",employeeSchema)