const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    user : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Users'
    },
    date : mongoose.SchemaTypes.Date
});

module.exports = mongoose.model("Attendance", attendanceSchema);