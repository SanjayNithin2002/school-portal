var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var timeToString = require('../middleware/timeToString');
var Classes = require('../models/Classes');
var checkAuth = require('../middleware/checkAuth');

router.get("/", checkAuth, (req, res, next) => {
    Classes.find().populate('teacher').exec()
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

router.get("students/:studentID", checkAuth, (req, res, next) => {
    Students.findById(req.params.studentID).exec()
        .then(studDoc => {
            var standard = studDoc.standard;
            var section = studDoc.section;
            Classes.find().populate('teacher').exec()
                .then(docs => {
                    var classes = docs.filter(doc => doc.standard === standard && doc.section === section);
                    res.status(200).json({
                        classes: classes
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post("/", checkAuth, (req, res, next) => {
    var classes = new Classes({
        _id: new mongoose.Types.ObjectId(),
        teacher: req.body.teacher,
        standard : req.body.standard,
        section : req.body.section,
        subject : req.body.subject,
        timings : req.body.timings.map(timing => {
            return {
                startTime : timeToString(timing.startTime),
                endTime : timeToString(timing.endTime),
                day : timing.day
            }
        })
    });
    classes.save()
        .then(docs => {
            res.status(201).json({
                message: "Class Created Successfully",
                docs: docs
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });
})

module.exports = router;