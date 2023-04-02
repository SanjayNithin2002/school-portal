var mongoose = require('mongoose');
var Teachers = require('../models/Teachers');
var express = require('express');
var router = express.Router();

router.get("/", (req, res, next) => {
    Teachers.find().populate('user').exec()
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
    Teachers.findById(req.params.id).populate('user').exec()
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
    var teachers = new Teachers({
        _id: new mongoose.Types.ObjectId(),
        name : req.body.name,
        user : req.body.user,
        age : req.body.age,
        dob : req.body.dob,
        handles : {
            standard : req.body.handles.standard,
            section : req.body.handles.section
        },
        level : req.body.level,
        salary : req.body.salary,
        joinDate : req.body.joinDate,
        address : {
            houseNumber : req.body.address.houseNumber,
            street : req.body.address.street,
            city : req.body.address.city,
            zipCode : req.body.address.zipCode
        }
    });
    teachers.save()
        .then(docs => {
            res.status(201).json({
                message: "Teacher Created Successfully",
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
    Teachers.findByIdAndUpdate(id, updateOps).populate('classes').exec()
        .then(docs => {
            res.status(200).json({
                message: "Teacher Updated Successfully",
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
    Teachers.findByIdAndDelete(req.params.id)
        .exec()
        .then(docs => {
            res.status(200).json({
                message: "Teacher Deleted Successfully",
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