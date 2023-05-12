var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var timeToString = require('../middleware/timeToString');
var Classes = require('../models/Classes');

router.get("/", (req, res, next) => {
    Classes.find().populate('teacher students').exec()
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
})

router.post("/", (req, res, next) => {
    var classes = new Classes({
        _id: new mongoose.Types.ObjectId(),
        teacher: req.body.teacher,
        class : req.body.class,
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