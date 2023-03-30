var mongoose = require('mongoose');

var addressSchema = new mongoose.Schema({
    houseNumber: {
        type: String,
    },
    street: {
        type: String,
    },
    city: {
        type: String,
    },
    zipCode: {
        type: String,
    }
});

var teacherSchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Users'
    },
    name : {
        type:  String
    },
    age : {
        type : Number
    },
    dob : {
        type : Date
    },
    level : {
        type : Number
    },
    salary : {
        type : Number
    },
    joinDate : {
        type : Date
    },
    address : {
        type : addressSchema
    }
});

module.exports = mongoose.model("Teacher", teacherSchema);