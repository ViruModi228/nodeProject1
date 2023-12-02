const mongoose = require('mongoose')
const Schema = mongoose.Schema

const authSchema = new Schema({
    employee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true,
    },
    token:{
        type:String
    }
})

module.exports = mongoose.model("auth",authSchema)