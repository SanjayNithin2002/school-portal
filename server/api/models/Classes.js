var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    teacher : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Teachers',
        require : true
    },
    class : Number,
    section : String,
    subject : String, 
    timings : [{
        startTime : String,
        endTime : String,
        day : String
    }]
});

module.exports = mongoose.model('Classes', classSchema);