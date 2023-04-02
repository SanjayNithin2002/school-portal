var mongoose = require('mongoose');
var Leave = require('../models/Leave');
var Teachers = require('../models/Teachers');
var dateDiffInDays = require('../middleware/dateDiffInDays');
var express = require('express');
var router = express.Router();


router.post("/", (req, res, next) => {
    Teachers.findById(req.body.teacherId).exec()
        .then(docs => {
            if (docs) {
                if (docs[req.body.type] < dateDiffInDays(req.body.startDate, req.body.endDate)) {
                    res.status(500).json({
                        message: "You Don't Have Enough " + req.body.type + " Leave"
                    })
                } else {
                    var leave = new Leave({
                        _id: new mongoose.Types.ObjectId(),
                        teacherId: req.body.teacherId,
                        type: req.body.type,
                        startDate: req.body.startDate,
                        endDate: req.body.endDate,
                        reason: req.body.reason
                    });
                    leave.save()
                        .then(docs => {
                            Teachers.findByIdAndUpdate(req.body.teacherId, { $inc: { [req.body.type]: -dateDiffInDays(req.body.startDate, req.body.endDate) } }, { new: true }).exec()
                                .then(doc => {
                                    res.status(201).json({
                                        message: "Leave Created Successfully",
                                        docs: docs
                                    })
                                })
                                .catch(err => {
                                    res.status(500).json({
                                        error: err
                                    })
                                })
                        })
                        .catch(err => {
                            res.status(500).json({
                                error: err
                            })
                        });
                }
            }
            else {
                res.status(404).json({
                    message: "Teacher Not Found"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/", (req, res, next) => {
    Leave.find().exec()
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
    Leave.findById(req.params.id).exec()
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

router.patch("/:id", (req, res, next) => {
    var updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Leave.findByIdAndUpdate(req.params.id, updateOps).exec()
        .then(docs => {
            res.status(200).json({
                message: "Leave Updated Successfully",
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
    Leave.findByIdAndRemove(req.params.id).exec()
        .then(docs => {
            Teachers.findByIdAndUpdate(docs.teacherId, { $inc: { [docs.type]: dateDiffInDays(docs.startDate, docs.endDate) } }, { new: true }).exec()
                .then(doc => {
                    res.status(200).json({
                        message: "Leave Deleted Successfully",
                        docs: doc
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
});



module.exports = router;