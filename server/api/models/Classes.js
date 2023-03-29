var mongoose = require('mongoose');

var classSchema = mongoose.Schema({
    _id : mongoose.SchemaTypes.ObjectId,
    faculty : {
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Users',
        require : true
    },
    classno : Number,
    students : [{
        type : mongoose.SchemaTypes.ObjectId,
        ref : 'Users'
    }]
})

module.exports = mongoose.model('Classes', classSchema);