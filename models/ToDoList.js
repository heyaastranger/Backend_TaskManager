const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToDoList = new Schema({
    task: {
        type : String,
        required : true
    },
    timestamp:{
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("ToDoList", ToDoList);