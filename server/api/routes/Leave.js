var mongoose = require('mongoose');
var Leave = require('../models/Leave');
var Teachers = require('../models/Teachers');
const Admins = require('../models/Admins');
var dateDiffInDays = require('../middleware/dateDiffInDays');
var express = require('express');
var router = express.Router();


router.post("/", (req, res, next) => {
    if (req.body.user === "Teacher") {
        Teachers.findById(req.body.userID).exec()
            .then(docs => {
                if (docs) {
                    if (docs[req.body.type] < dateDiffInDays(req.body.startDate, req.body.endDate)) {
                        res.status(500).json({
                            message: "You Don't Have Enough " + req.body.type + " Leave"
                        })
                    } else {
                        var leave = new Leave({
                            _id: new mongoose.Types.ObjectId(),
                            userID: req.body.userID,
                            type: req.body.type,
                            startDate: req.body.startDate,
                            endDate: req.body.endDate,
                            reason: req.body.reason
                        });
                        leave.save()
                            .then(docs => {
                                Teachers.findByIdAndUpdate(req.body.userID, { $inc: { [req.body.type]: -dateDiffInDays(req.body.startDate, req.body.endDate) } }, { new: true }).exec()
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
                        message: "Teacher Not Found",
                        doc : docs
                    })
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
    }
    if (req.body.user === "Admin") {
        Admins.findById(req.body.userID).exec()
            .then(docs => {
                if (docs) {
                    if (docs[req.body.type] < dateDiffInDays(req.body.startDate, req.body.endDate)) {
                        res.status(500).json({
                            message: "You Don't Have Enough " + req.body.type + " Leave"
                        })
                    } else {
                        var leave = new Leave({
                            _id: new mongoose.Types.ObjectId(),
                            userID: req.body.userID,
                            type: req.body.type,
                            startDate: req.body.startDate,
                            endDate: req.body.endDate,
                            reason: req.body.reason
                        });
                        leave.save()
                            .then(docs => {
                                Admins.findByIdAndUpdate(req.body.userID, { $inc: { [req.body.type]: -dateDiffInDays(req.body.startDate, req.body.endDate) } }, { new: true }).exec()
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

    }
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

router.patch("/", (req, res, next) => {
    if (req.body.user === "Teacher") {
        if (req.body.status === "Approved") {
            Leave.findByIdAndUpdate(req.body.id, { $set: { status: req.body.status } }, { new: true }).exec()
                .then(docs => {
                    res.status(200).json({
                        message: "Leave Approved Successfully",
                        docs: docs
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }
        if (req.body.status === "Rejected") {
            Leave.findById(req.body.id).exec()
                .then(docs => {
                    Teachers.findByIdAndUpdate(docs.userID, { $inc: { [docs.type]: dateDiffInDays(docs.startDate, docs.endDate) } }, { new: true }).exec()
                        .then(doc => {
                            res.status(200).json({
                                message: "Leave Cancelled Successfully",
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
        }
    }
    if (req.body.user === "Admin") {
        if (req.body.status === "Approved") {
            Leave.findByIdAndUpdate(req.body.id, { $set: { status: req.body.status } }, { new: true }).exec()
                .then(docs => {
                    res.status(200).json({
                        message: "Leave Deleted Successfully",
                        docs: docs
                    })
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }
        if (req.body.status === "Rejected") {
            Leave.findById(req.body.id).exec()
                .then(docs => {
                    Admins.findByIdAndUpdate(docs.userID, { $inc: { [docs.type]: dateDiffInDays(docs.startDate, docs.endDate) } }, { new: true }).exec()
                        .then(doc => {
                            res.status(200).json({
                                message: "Leave Cancelled Successfully",
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
        }
    }

});

router.delete("/", (req, res, next) => {
    if (req.body.user === "Teacher") {
        Leave.findByIdAndRemove(req.body.id).exec()
            .then(docs => {
                Teachers.findByIdAndUpdate(docs.userID, { $inc: { [docs.type]: dateDiffInDays(docs.startDate, docs.endDate) } }, { new: true }).exec()
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
    }
    if (req.body.user === "Admin") {
        Leave.findByIdAndRemove(req.body.userID).exec()
            .then(docs => {
                Admins.findByIdAndUpdate(docs.userID, { $inc: { [docs.type]: dateDiffInDays(docs.startDate, docs.endDate) } }, { new: true }).exec()
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
    }
});



module.exports = router;