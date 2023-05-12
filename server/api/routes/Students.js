var mongoose = require('mongoose');
var Students = require('../models/Students');
var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");


router.post("/sendotp", (req, res, next) => {
    const otp = Math.floor(Math.random() * (999999 - 100000 + 1) + 100000);
    const mailOptions = {
        from: 'schoolportal@vit.edu.in',
        to: req.body.email,
        subject: 'Verify your OTP for School Portal',
        text: 'Your OTP for the school portal is ' + otp
    };
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.NODEMAIL,
            pass: process.env.NODEMAIL_PASSWORD
        }
    })
        .sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                res.status(201).json({
                    message: "OTP Sent Successfully",
                    otp: otp
                });
            }
        });
});
router.post("/signup",(req, res, next) => {
    Students.find({ email: req.body.email }).exec()
        .then(docs => {
            if (docs.length > 0) {
                res.status(422).json({
                    message: "Email exists"
                });
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json({
                            error: err
                        });
                    } else {
                        const student = new Students({
                            _id: new mongoose.Types.ObjectId(),
                            email: req.body.email,
                            password: hash,
                            standard : req.body.standard,
                            section : req.body.section
                        });
                        student.save()
                            .then(docs => {
                                res.status(201).json({
                                    message: "User Created"
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            });
                    }
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });

});

router.post("/login",(req, res, next) => {
    Students.find({ email: req.body.email }).exec()
        .then(docs => {
            if (docs.length < 1) {
                res.status(401).json({
                    message: "Auth Failed"
                });
            } else {
                bcrypt.compare(req.body.password, docs[0].password, (err, response) => {
                    if (err) {
                        res.status(401).json({
                            message: "Auth Failed"
                        });
                    }
                    if (response) {
                        res.status(200).json({
                            message: "Auth Successful"
                        });
                    } else {
                        res.status(401).json({
                            message: "Auth Failed"
                        });
                    }
                })
            }
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });


});


router.get("/", (req, res, next) => {
    Students.find().exec()
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
    Students.findById(req.params.id).populate('user').exec()
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

router.patch("/:id", (req, res, next) => {
    var id = req.params.id;
    var updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Students.findByIdAndUpdate(id, updateOps).populate('classes').exec()
        .then(docs => {
            res.status(200).json({
                message: "Student Updated Successfully",
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
    var id = req.params.id;
    Students.findByIdAndDelete(id).populate('classes').exec()
        .then(docs => {
            res.status(200).json({
                message: "Student Deleted Successfully",
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