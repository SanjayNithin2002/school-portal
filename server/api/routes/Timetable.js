var mongoose = require('mongoose');
var Timetable = require('../models/Timetable');
var timeToString = require('../middleware/timeToString');
var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    Timetable.find().populate('classId').exec()
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

router.post("/", (req, res, next) => {
    var timetable = new Timetable({
        _id: new mongoose.Types.ObjectId(),
        classId: req.body.classid,
        startTime: timeToString(req.body.starttime),
        endTime: timeToString(req.body.endtime),
        day: req.body.day
    });
    timetable.save()
        .then(doc => {
            res.status(201).json({
                message: "Timetable posted",
                docs: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;