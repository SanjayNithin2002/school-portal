const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    name : { type : String, required : true},
    grade : { type : Number, required : true}
});

module.exports = mongoose.model("Students", studentSchema);
