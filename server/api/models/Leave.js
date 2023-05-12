var mongoose = require('mongoose');

var leaveSchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    userID : {
        type : mongoose.SchemaTypes.ObjectId
    },
    type : {
        type : String
    },
    startDate : {
        type : Date
    },
    endDate : {
        type : Date
    },
    reason : {
        type : String
    },
    status : {
        type : String,
        default : "Pending"
    }
});

module.exports = mongoose.model("Leave", leaveSchema);
