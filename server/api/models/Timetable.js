var mongoose = require('mongoose');

var timetableSchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    classId : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Classes'
    },
    startTime : {
        type : String
    },
    endTime :{
        type : String
    },
    day : {
        type : String
    }
});

module.exports = mongoose.model("Timetable", timetableSchema);