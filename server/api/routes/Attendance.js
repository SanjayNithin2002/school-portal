const mongoose = require("mongoose");
const express = require("express");
const Attendance = require("../models/Attendance");
const router = express.Router();

router.post("/post", (req, res, next) => {
    const attendance = new Attendance({
        _id: new mongoose.Types.ObjectId(),
        user: req.body.user,
        date: req.body.date
    });
    attendance.save()
        .then(doc => {
            res.status(201).json({
                message: "Attendance Posted",
                doc: doc
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
})

router.post("/postAll", (req, res, next) => {
    students = req.body.students;
    docs = students.map(student => {
        return {
            user: student,
            date: new Date(req.body.date)
        }
    });
    Attendance.insertMany(docs)
        .then(docs => {
            res.status(201).json({
                message: "Attendance Posted",
                docs: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.get("/getuser/:id", (req, res, next) => {
    Attendance.find({ user: req.params.id }).populate('user').exec()
        .then(docs => {
            res.status(201).json({
                docs: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

module.exports = router;