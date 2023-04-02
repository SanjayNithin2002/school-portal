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

var adminSchema = mongoose.Schema({
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

module.exports = mongoose.model("Admins", adminSchema);