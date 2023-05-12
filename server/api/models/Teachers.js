var mongoose = require('mongoose');

var teacherSchema = mongoose.Schema({
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
    casualLeave : {
        type : Number,
        default : 12
    },
    earnedLeave :{
        type : Number,
        default : 12
    },
    sickLeave : {
        type : Number,
        default : 12
    }
});

module.exports = mongoose.model("Teachers", teacherSchema);