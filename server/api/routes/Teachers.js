var mongoose = require('mongoose');
var Teachers = require('../models/Teachers');
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
    }).sendMail(mailOptions, function (error, info) {
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

router.post("/signup", (req, res, next) => {
    var email = req.body.email;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var empID = req.body.empID;
    var userID = firstName + lastName + empID;
    var length = 10;
    var password = Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');
    const mailOptions = {
        from: 'schoolportal@vit.edu.in',
        to: req.body.email,
        subject: 'Login Credentials for School Portal',
        text: `Login into your account using the following credentials:\nUserID: ${userID}\nPassword: ${password}\n\nPlease change your password after logging in.`
    };
    bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
            res.status(500).json({
                error: err
            });
        } else {
            const teacher = new Teachers({
                _id: new mongoose.Types.ObjectId(),
                password: hash,
                email: email,
                userID: userID,
                firstName: firstName,
                lastName: lastName,
                empID: empID,
                dob: req.body.dob,
                gender: req.body.gender,
                bloodGroup: req.body.bloodGroup,
                aadharNumber: req.body.aadharNumber,
                motherTongue: req.body.motherTongue,
                address: {
                    line1: req.body.address.line1,
                    line2: req.body.address.line2,
                    city: req.body.address.city,
                    state: req.body.address.state,
                    pincode: req.body.address.pincode
                },
                phoneNumber: req.body.phoneNumber,
                qualification: req.body.qualification,
                experience: req.body.experience,
                salaryDetails: {
                    basic: req.body.salaryDetails.basic,
                    hra: req.body.salaryDetails.hra,
                    conveyance: req.body.salaryDetails.conveyance,
                    pa: req.body.salaryDetails.pa,
                    pf: req.body.salaryDetails.pf,
                    pt: req.body.salaryDetails.pt,
                },
                busDetails: {
                    isNeeded: (req.body.busDetails !== undefined ? req.body.busDetails.isNeeded : false),
                    busStopArea: (req.body.busDetails !== undefined ? req.body.busDetails.busStopArea : "NA"),
                    busStop: (req.body.busDetails !== undefined ? req.body.busDetails.busStop : "NA"),
                    availableBus: (req.body.busDetails !== undefined ? req.body.busDetails.availableBus : "NA")
                },
                hostelDetails: {
                    isNeeded: (req.body.hostelDetails !== undefined ? req.body.hostelDetails.isNeeded : false),
                    roomType: (req.body.hostelDetails !== undefined ? req.body.hostelDetails.roomType : "NA"),
                    foodType: (req.body.hostelDetails !== undefined ? req.body.hostelDetails.foodType : "NA"),
                }
            });
            teacher.save()
                .then(doc => {
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: process.env.NODEMAIL,
                            pass: process.env.NODEMAIL_PASSWORD
                        }
                    }).sendMail(mailOptions, function (error, info) {
                        if (error) {
                            console.log(error);
                        } else {
                            res.status(201).json({
                                message: "OTP Sent Successfully",
                                id: doc._id
                            });
                        }
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                });
        }
    });

});

router.post("/login", (req, res, next) => {
    Teachers.find({ userID: req.body.userID }).exec()
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
    Teachers.find().exec()
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
    Teachers.findById(req.params.id).exec()
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

router.patch("/userid", (req, res) => {
    var id = req.body.id;
    var currentUserID = req.body.currentUserID;
    var newUserID = req.body.newUserID;
    var password = req.body.password;
    Teachers.find({ userID: newUserID }).exec()
        .then(docs => {
            if (docs.length >= 1) {
                res.status(409).json({
                    message: "UserID Already Exists"
                })
            } else {
                Teachers.findById(id).exec()
                    .then(doc => {
                        if (doc === null) {
                            res.status(404).json({
                                message: "Teacher Not Found"
                            })
                        } else if (doc.userID !== currentUserID) {
                            res.status(401).json({
                                message: "Auth Failed"
                            })
                        }
                        else {
                            bcrypt.compare(password, doc.password, (err, response) => {
                                if (err) {
                                    res.status(401).json({
                                        message: "Auth Failed"
                                    });
                                }
                                if (response) {
                                    Teachers.findByIdAndUpdate(id, { userID: newUserID }).exec()
                                        .then(docs => {
                                            res.status(200).json({
                                                message: "User ID Updated Successfully",
                                                docs: docs
                                            })
                                        })
                                        .catch(err => {
                                            res.status(500).json({
                                                error: err
                                            })
                                        })
                                } else {
                                    res.status(401).json({
                                        message: "Auth Failed"
                                    });
                                }
                            })
                        }
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.patch("/password", (req, res) => {
    var id = req.body.id;
    var currentPassword = req.body.currentPassword;
    var newPassword = req.body.newPassword;
    Teachers.findById(id).exec()
        .then(doc => {
            bcrypt.compare(currentPassword, doc.password, (err, response) => {
                if (err) {
                    res.status(401).json({
                        message: "Auth Failed"
                    });
                }
                if (response) {
                    bcrypt.hash(newPassword, 10, (err, hash) => {
                        Teachers.findByIdAndUpdate(id, { password: hash }).exec()
                            .then(docs => {
                                res.status(200).json({
                                    message: "Password Updated Successfully"
                                })
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                })
                            });
                    });
                } else {
                    res.status(401).json({
                        message: "Auth Failed"
                    });
                }
            })
        }).catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.patch("/:id", (req, res, next) => {
    var id = req.params.id;
    var updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Teachers.findByIdAndUpdate(id, updateOps).exec()
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