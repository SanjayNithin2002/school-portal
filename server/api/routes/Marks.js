var mongoose = require('mongoose');
var Marks = require('../models/Marks');
var Assessments = require('../models/Assessments');
var express = require('express');
var router = express.Router();

router.get("/", (req, res) => {
    Marks.find().populate([{path : "assessment", populate : {path : "class"}}, {path : "student"}]).exec()
        .then(docs => {
            res.status(200).json({
                docs: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/:id", (req, res) => {
    Marks.findById(req.params.id).populate([{path : "assessment", populate : {path : "class"}}, {path : "student"}]).exec()
        .then(doc => {
                res.status(200).json({
                    doc: doc
                });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/students/:studentID", (req, res) => {
    Marks.find({ student: req.params.studentID }).populate([{path : "assessment", populate : {path : "class"}}, {path : "student"}]).exec()
        .then(docs => {
            res.status(200).json({
                docs: docs
            });
        }
        )
        .catch(err => {
            res.status(500).json({
                error: err
            })
        }
        );
});

router.get("/assessments/:assessmentID", (req, res) => {
    Marks.find({ assessment: req.params.assessmentID }).populate([{path : "assessment", populate : {path : "class"}}, {path : "student"}]).exec()
        .then(docs => {
            res.status(200).json({
                docs: docs
            });
        }
        )
        .catch(err => {
            res.status(500).json({
                error: err
            })
        }
        );
});

router.post("/", (req, res) => {
    Assessments.findById(req.body.assessment).exec()
        .then(doc => {
            var maxMarks = doc.maxMarks;
            var weightageMarks = doc.weightageMarks;
            var scoredMarks = req.body.scoredMarks;
            var weightageScoredMarks = (scoredMarks / maxMarks) * weightageMarks;
            var mark = new Marks({
                _id: new mongoose.Types.ObjectId(),
                student: req.body.student,
                assessment: req.body.assessment,
                scoredMarks: scoredMarks,
                weightageScoredMarks: weightageScoredMarks,
                remarks: req.body.remarks
            });
            mark.save()
                .then(result => {
                    res.status(201).json({
                        message: "Mark Saved Successfully",
                        result: result
                    });
                }
                )
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                }
                );
        })
});

router.post("/postmany", (req, res) => {
    //receive student array and perform insert many operation
    Assessments.findById(req.body.assessment).exec()
        .then(doc => {
            var maxMarks = doc.maxMarks;
            var weightageMarks = doc.weightageMarks;
            var marks = req.body.marks;
            var marks = marks.map(mark => {
                return {
                    _id: new mongoose.Types.ObjectId(),
                    student: mark.student,
                    assessment: req.body.assessment,
                    scoredMarks: mark.scoredMarks,
                    weightageScoredMarks: (mark.scoredMarks / maxMarks) * weightageMarks,
                    remarks: mark.remarks
                }
            });
            Marks.insertMany(marks)
                .then(result => {
                    res.status(201).json({
                        message: "Marks Saved Successfully",
                        result: result
                    });
                }
                )
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                }
                );
        }   
        )
});

router.delete("/:id", (req, res) => {
    Marks.findByIdAndDelete(req.params.id).exec()
        .then(doc => {
            res.status(200).json({
                message: "Mark Deleted Successfully",
                doc: doc
            });
        }
        )
        .catch(err => {
            res.status(500).json({
                error: err
            })
        }
        );
});

module.exports = router;