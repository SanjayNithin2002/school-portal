var mongoose = require('mongoose');

var studentSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    password : {
        type : String, 
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    standard : Number,
    section : String
});

module.exports = mongoose.model("Students", studentSchema);