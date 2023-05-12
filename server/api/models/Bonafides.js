var mongoose = require('mongoose');

var bonafideSchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    student : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Students",
        required : true
    },
    service : String,
    description : String,
    requestedFile : String
});

module.exports = mongoose.model("Bonafides", bonafideSchema);