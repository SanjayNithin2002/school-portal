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
    studysIn : {
        standard: {
            type: Number
        },
        section: {
            type: String
        }
    },
    age: {
        type: Number
    },
    dob: {
        type: Date
    },
    father: {
        type: String,
        default : null
    },
    mother: {
        type: String,
        default : null
    },
    guardian: {
        type: String,
        default : null
    },
    hosteller: {
        roomno: {
            type: Number
        },
        block: {
            type: String
        }
    },
    address : {
        type : addressSchema
    }

});

module.exports = mongoose.model("Students", studentSchema);