var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var AdminAttendance = require('../models/AdminAttendance');

router.get("/", (req, res) => {
    AdminAttendance.find().populate("admin").exec()
        .then(docs => {
            res.status(200).json({
                docs: docs
            })
        }
        ).catch(err => {
            res.status(500).json({
                error: err
            })
        }
        )
});

router.get("/:id", (req, res) => {
    AdminAttendance.findById(req.params.id).populate("admin").exec()
        .then(docs => {
            res.status(200).json({
                docs: docs
            })
        }
        ).catch(err => {
            res.status(500).json({
                error: err
            })
        }
        )
});

router.get("/admins/:adminID", (req, res) => {
    AdminAttendance.find({ admin: req.params.adminID }).exec()
        .then(docs => {
            var present = 0;
            var absent = 0;
            docs.forEach(doc => {
                if (doc.status == "present") {
                    present++;
                } else {
                    absent++;
                }
            }
            );
            res.status(200).json({
                docs: docs,
                present: present / 2,
                absent: absent / 2
            })
        }
        ).catch(err => {
            res.status(500).json({
                error: err
            })
        }
        )
});

router.post("/", (req, res) => {
    const adminAttendance = new AdminAttendance({
        _id: new mongoose.Types.ObjectId(),
        admin: req.body.admin,
        date: req.body.date,
        time: req.body.time,
        status: req.body.status
    });
    adminAttendance.save().then(result => {
        res.status(200).json({
            message: "AdminAttendance Created Successfully",
            createdAdminAttendance: result
        })
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })

});

router.post("/postmany", (req, res) => {
    var date = req.body.date;
    var time = req.body.time;
    var attendances = req.body.attendances;
    var adminAttendances = attendances.map(attendance => {
        return new AdminAttendance({
            _id: new mongoose.Types.ObjectId(),
            admin: attendance.admin,
            date: date,
            time: time,
            status: attendance.status
        })
    }
    );
    AdminAttendance.insertMany(adminAttendances).then(result => {
        res.status(200).json({
            message: "AdminAttendances Created Successfully",
            createdAdminAttendances: result
        })
    }
    ).catch(err => {    
        res.status(500).json({
            error: err
        })
    }
    )
});

router.delete("/:id", (req, res) => {
    AdminAttendance.findByIdAndDelete(req.params.id).exec()
        .then(docs => {
            res.status(200).json({
                message: "AdminAttendance Deleted Successfully",
                docs: docs
            })
        }
        ).catch(err => {
            res.status(500).json({
                error: err
            })
        }
        )
});

module.exports = router;