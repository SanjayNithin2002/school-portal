var mongoose = require('mongoose');
var express = require('express');
var multer = require('multer');
var Students = require('../models/Students');
var Assessments = require('../models/Assessments');
var router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./assessments/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)

    }
});

const fileFilter = (req, file, cb) => {
    //accept
    if (file.mimetype === 'application/pdf') {
        cb(null, true);
    }
    //reject
    else {
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 10
    },
    fileFilter: fileFilter
});

router.get("/", (req, res) => {
    Assessments.find().exec()
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

router.get("/students/:studentID", (req, res) => {
    Students.findById(req.params.studentID).exec()
        .then(doc => {
            var standard = doc.standard;
            var section = doc.section;
            Assessments.find().populate('class').exec()
                .then(docs => {
                    var assessments = docs.filter(doc => {
                        return doc.class.standard === standard && doc.class.section === section
                    });
                    var assessments = assessments.map(doc => {
                        return {
                            _id: doc._id,
                            maxMarks: doc.maxMarks,
                            weightageMarks: doc.weightageMarks,
                            postedOn: doc.postedOn,
                            lastDate: doc.lastDate,
                            title: doc.title,
                            questionPaper: doc.questionPaper,
                            subject: doc.class.subject,
                            standard: doc.class.standard,
                            section: doc.class.section
                        }
                    });
                    res.status(200).json({
                        assessments : assessments
                    })
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        })
});

router.post("/", upload.single('questionPaper'), (req, res) => {
    var assessment = new Assessments({
        _id: new mongoose.Types.ObjectId(),
        maxMarks: req.body.maxMarks,
        weightageMarks: req.body.weightageMarks,
        postedOn: new Date().toJSON().slice(0, 10),
        lastDate: req.body.lastDate,
        title: req.body.title,
        questionPaper : req.file.path,
        class: req.body.class
    });
    assessment.save()
        .then(doc => {
            res.status(201).json({
                message: "Assessment Created Successfully",
                doc: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.delete("/:id", (req, res) => {
    Assessments.findByIdAndDelete(req.params.id).exec()
        .then(doc => {
            res.status(201).json({
                message: "Assessment Deleted Successfully",
                doc: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;