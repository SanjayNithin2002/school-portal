var mongoose = require('mongoose');
var markSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    student : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Students',
        required : true
    },
    assessment : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Assessments',
        required : true
    },
    scoredMarks : Number,
    weightageScoredMarks : Number,
    remarks : String
});

module.exports = mongoose.model('Marks', markSchema);
