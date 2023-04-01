var mongoose = require('mongoose');
var Students = require('../models/Students');
var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    Students.find().populate('classes').exec()
        .then(docs => {
            res.status(200).json({
                docs: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.get("/:id", (req, res, next) => {
    Students.findById(req.params.id).populate('classes').exec()
        .then(docs => {
            res.status(200).json({
                docs: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.post("/", (req, res, next) => {
    var students = new Students({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user : req.body.user,
        classes: req.body.classes
    });
    students.save()
        .then(docs => {
            res.status(201).json({
                message: "Student Created Successfully",
                docs: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.patch("/:id", (req, res, next) => {
    var id = req.params.id;
    var updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Students.findByIdAndUpdate(id, updateOps).populate('classes').exec()
        .then(docs => {
            res.status(200).json({
                message: "Student Updated Successfully",
                docs: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

router.delete("/:id", (req, res, next) => {
    var id = req.params.id;
    Students.findByIdAndDelete(id).populate('classes').exec()
        .then(docs => {
            res.status(200).json({
                message: "Student Deleted Successfully",
                docs: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});

module.exports = router;