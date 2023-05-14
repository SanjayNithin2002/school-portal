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
    userID : {
        type : String,
        required : true,
        unique : true
    },
    firstName : String,
    lastName : String,
    empID : {
        type : String,
        required : true,
        unique : true
    },
    dob : Date,
    gender : String,
    bloodGroup : String,
    aadharNumber : String,
    motherTongue : String,
    address : {
        line1 : String,
        line2 : String,
        city : String,
        state : String,
        pincode : Number
    },
    phoneNumber : String,
    qualification : String,
    experience : Number,
    salaryDetails : {
        basic : Number,
        hra : Number,
        conveyance : Number,
        pa : Number,
        pf : Number,
        pt : Number,
    },
    busDetails : {
        isNeeded : Boolean,
        busStopArea : String,
        busStop : String,
        availableBus : String
    },
    hostelDetails : {
        isNeeded : Boolean,
        roomType : String,
        foodType : String
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