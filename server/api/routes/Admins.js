var mongoose = require('mongoose');
var Admins = require('../models/Admins');
var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    Admins.find().populate('classes').exec()
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
    Admins.findById(req.params.id).populate('classes').exec()
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
    var admins = new Admins({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user : req.body.user,
        classes: req.body.classes
    });
    admins.save()
        .then(docs => {
            res.status(201).json({
                message: "Admin Created Successfully",
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
    Admins.findByIdAndUpdate(id, updateOps).populate('classes').exec()
        .then(docs => {
            res.status(200).json({
                message: "Admin Updated Successfully",
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
    Admins.findByIdAndDelete(req.params.id).populate('classes').exec()
        .then(docs => {
            res.status(200).json({
                message: "Admin Deleted Successfully",
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