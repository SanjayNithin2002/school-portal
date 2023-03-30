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


var studentSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Users'
    },
    name: {
        type: String
    },
    standard: {
        type: Number
    },
    section: {
        type: String
    },
    age: {
        type: Number
    },
    dob: {
        type: Date
    },
    father: {
        type: String
    },
    mother: {
        type: String
    },
    guardian: {
        type: String
    },
    hosteller: {
        roomno: {
            type: Number
        },
        block: {
            type: String
        }
    },
    classTeacher: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Teachers'
    },
    address : {
        type : addressSchema
    }

});

module.exports = mongoose.model("Students", studentSchema);