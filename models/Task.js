const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'must add name'],
        trim:true,
        maxLength:[20,"name shoul dnot have lenght more than 20"]
    },
    completed:{
        type:Boolean,
        default:false
    }
})

module.exports = mongoose.model("Task",TaskSchema)