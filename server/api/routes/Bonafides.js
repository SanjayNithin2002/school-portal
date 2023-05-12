var mongoose = require('mongoose');
var express = require('express');
var multer = require('multer');
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

router.get("/", (req, res) => {
    Bonafides.find().exec()
        .then(docs => {
            res.status(200).json({
                bonafides: docs
            });
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
                bonafide: doc
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
            res.status(200).json({
                bonafides: docs
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
        student : req.body.student
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
            res.status(201).json({
                message: "Bonafide Request Updated Successfully",
                bonafide: doc
            })
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