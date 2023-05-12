var mongoose = require('mongoose');
var studentAttendanceSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Students',
        required : true
    },
    date : Date,
    time : String,
    status : String
});

module.exports = mongoose.model('StudentAttendances', studentAttendanceSchema);