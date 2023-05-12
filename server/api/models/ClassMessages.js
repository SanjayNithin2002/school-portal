var mongoose = require('mongoose');

var classMessageSchema = mongoose.Schema({
    _id: mongoose.SchemaTypes.ObjectId,
    class: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Classes',
        required: true
    },
    message: String,
    postedBy : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Teachers',
        required : true
    }
});

module.exports = mongoose.model("ClassMessages", classMessageSchema);