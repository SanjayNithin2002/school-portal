var mongoose = require('mongoose');
var ClassMessages = require("../models/ClassMessages");
var Students = require('../models/Students');
var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    ClassMessages.find().populate('class').exec()
        .then(docs => {
            res.status(200).json({
                docs: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});


router.get("/students/:studentID", (req, res)=> {
    Students.findById(req.params.studentID).exec()
    .then(student => {
        var standard = student.standard;
        var section = student.section;
        ClassMessages.find().populate('class').exec()
        .then(docs => {
            var classMessages = docs.filter(doc => {
                return doc.class.standard == standard && doc.class.section == section;
            })
            res.status(200).json({
                docs: classMessages
            })
        }
        )
})
});

router.get("/teachers/:teacherID", (req, res)=>{
    var teacherID = req.params.teacherID;
    ClassMessages.find().populate('class').exec()
    .then(docs => {
        var classMessages = docs.filter(doc => {
            return String(doc.class.teacher) === String(teacherID);
        })
        res.status(200).json({
            docs : classMessages
        })
    })
});

router.post("/", (req, res) => {
    var classMessages = new ClassMessages({
        _id: new mongoose.Types.ObjectId(),
        class: req.body.class,
        message: req.body.message
    });
    classMessages.save()
        .then(docs => {
            res.status(201).json({
                message: "Class Message Created Successfully",
                docs: docs
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.delete("/:id", (req, res)=>{
    ClassMessages.findByIdAndDelete(req.params.id).exec()
    .then(docs => {
        res.status(200).json({
            message : "Class Message Deleted Successfully",
            docs : docs
        })
    })
    .catch(err => {
        res.status(500).json({
            error : err
        })
    })
})

module.exports = router;