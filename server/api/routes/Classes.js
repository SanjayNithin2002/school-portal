var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var Classes = require('../models/Classes');

router.get("/", (req, res, next) => {
    Classes.find().populate('faculty students').exec()
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
        faculty: req.body.faculty,
        students: req.body.students
    })
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