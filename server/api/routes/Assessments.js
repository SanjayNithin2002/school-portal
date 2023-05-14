var mongoose = require('mongoose');
var express = require('express');
var multer = require('multer');
var admin = require("firebase-admin");
var serviceAccount = require("../../serviceAccountKey.json");
var Students = require('../models/Students');
var Assessments = require('../models/Assessments');
var checkAuth = require('../middleware/checkAuth');
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

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET_URL
});

var bucket = admin.storage().bucket();

router.get("/", checkAuth, (req, res) => {
    Assessments.find().exec()
        .then(docs => {
            var assessments = docs.map(doc => {
                return {
                    _id: doc._id,
                    maxMarks: doc.maxMarks,
                    weightageMarks: doc.weightageMarks,
                    postedOn: doc.postedOn,
                    lastDate: doc.lastDate,
                    title: doc.title,
                    questionPaper: "http://localhost:3000/downloadfile/" + doc.questionPaper.split("\\").join("/"),
                    subject: doc.class.subject,
                    standard: doc.class.standard,
                    section: doc.class.section
                }
            });
            res.status(200).json({
                assessments: assessments
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/students/:studentID", checkAuth, (req, res) => {
    Students.findById(req.params.studentID).exec()
        .then(studDoc => {
            var standard = studDoc.standard;
            var section = studDoc.section;
            Assessments.find().populate('class').exec()
                .then(docs => {
                    var assessments = docs.filter(doc => doc.class.standard == standard && doc.class.section == section);
                    var assessments = assessments.map(doc => {
                        return {
                            _id: doc._id,
                            maxMarks: doc.maxMarks,
                            weightageMarks: doc.weightageMarks,
                            postedOn: doc.postedOn,
                            lastDate: doc.lastDate,
                            title: doc.title,
                            questionPaper: "http://localhost:3000/downloadfile/" + doc.questionPaper.split("\\").join("/"),
                            subject: doc.class.subject,
                            standard: doc.class.standard,
                            section: doc.class.section
                        }
                    })
                    res.status(200).json({
                        assessments: assessments
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });
});
router.post("/", checkAuth, upload.single('questionPaper'), (req, res) => {
    var assessment = new Assessments({
        _id: new mongoose.Types.ObjectId(),
        maxMarks: req.body.maxMarks,
        weightageMarks: req.body.weightageMarks,
        postedOn: new Date().toJSON().slice(0, 10),
        lastDate: req.body.lastDate,
        title: req.body.title,
        questionPaper: req.file.path,
        class: req.body.class
    });
    assessment.save()
        .then(doc => {
            bucket.upload(req.file.path, {
                destination: 'assessments/' + req.file.filename,
                metadata: {
                    contentType: req.file.mimetype
                }
            }, (err, file) => {
                if (err) {
                    console.log(err);
                    return;
                }
                else {
                    res.status(201).json({
                        message: "Assessment Uploaded Successfully",
                        doc: doc
                    });
                }
            }
            );
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.delete("/:id", checkAuth, (req, res) => {
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