var mongoose = require('mongoose');
var express = require('express');
var multer = require('multer');
var admin = require("firebase-admin");
var serviceAccount = require("../../serviceAccountKey.json");
var Bonafides = require('../models/Bonafides');
var router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./bonafides/");
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
}, "bonafides");

var bucket = admin.storage().bucket();

router.get("/", (req, res) => {
    Bonafides.find().exec()
        .then(docs => {
            var bonafides = docs.map(doc => {
                return {
                    _id: doc._id,
                    service: doc.service,
                    description: doc.description,
                    requestedFile: doc.requestedFile !== null ? "http://localhost:3000/downloadfile/" + doc.requestedFile.split("\\").join("/") : null,
                }
            });
            res.status(200).json({
                bonafides: bonafides
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/:id", (req, res) => {
    Bonafides.findById(req.params.id).exec()
        .then(doc => {
            res.status(200).json({
                bonafide: {
                    _id: doc._id,
                    service: doc.service,
                    description: doc.description,
                    requestedFile: req.body.requestedFile !== null ? "http://localhost:3000/downloadfile/" + doc.requestedFile.split("\\").join("/") : null,
                }
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/students/:studentID", (req, res) => {
    Bonafides.find({ student: req.params.studentID }).exec()
        .then(docs => {
            var bonafides = docs.map(doc => {
                return {
                    _id: doc._id,
                    service: doc.service,
                    description: doc.description,
                    requestedFile: doc.requestedFile !== null ? "http://localhost:3000/downloadfile/" + doc.requestedFile.split("\\").join("/") : null,
                }
            });
            res.status(200).json({
                bonafides: bonafides
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post("/", (req, res) => {
    var bonafide = new Bonafides({
        _id: new mongoose.Types.ObjectId(),
        service: req.body.service,
        description: req.body.description,
        student: req.body.student,
        requestedFile: req.body.requestedFile ? req.body.requestedFile : null,
    });
    bonafide.save()
        .then(doc => {
            res.status(201).json({
                message: "Bonafide Requested Successfully",
                bonafide: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});


router.patch("/:id", upload.single("bonafide"), (req, res) => {
    Bonafides.findByIdAndUpdate(req.params.id, {
        $set: {
            requestedFile: req.file.path
        }
    }).exec()
        .then(doc => {
            bucket.upload(req.file.path, {
                destination: 'bonafides/' + req.file.filename,
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
                        message: "Bonafide Uploaded Successfully",
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

router.delete("/:id", (req, res) => {
    Bonafides.findByIdAndDelete(req.params.id).exec()
        .then(doc => {
            res.status(200).json({
                message: "Bonafide Request Deleted Successfully",
                bonafide: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;