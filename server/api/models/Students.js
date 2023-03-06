const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
    _id : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : "Users"
    },
    name : { type : String, required : true},
    grade : { type : Number, required : true},
    email : {type : String, required : true}
});

module.exports = mongoose.model("Students", studentSchema);
