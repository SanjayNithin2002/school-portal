var mongoose = require('mongoose');
var Students = require('../models/Students');
var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const checkAuth = require('../middleware/checkAuth');

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
router.post("/signup", (req, res, next) => {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var dob = new Date(req.body.dob);
    var userID = firstName + lastName + dob.getDate() + Number(dob.getMonth() + 1) + dob.getFullYear();
    var length = 10;
    var password = Array.from({ length }, () => String.fromCharCode(Math.floor(Math.random() * 26) + 97)).join('');
    const mailOptions = {
        from: 'schoolportal@vit.edu.in',
        to: req.body.email,
        subject: 'Login Credentials for School Portal',
        text: `Login into your account using the following credentials:\nUserID: ${userID}\nPassword: ${password}\n\nPlease change your password after logging in.`
    };
    Students.find({ userID: userID }).exec()
        .then(docs => {
            if (docs.length > 0) {
                userID = userID + Math.floor(Math.random() * 10);
            }
            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    res.status(500).json({
                        error: err
                    });
                } else {
                    const student = new Students({
                        _id: new mongoose.Types.ObjectId(),
                        password: hash,
                        email: req.body.email,
                        userID: userID,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        standard: req.body.standard,
                        section: req.body.section,
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
                        father: {
                            name: (req.body.father !== undefined ? req.body.father.name : "NA"),
                            age: (req.body.father !== undefined ? req.body.father.age : 0),
                            qualification: (req.body.father !== undefined ? req.body.father.qualification : "NA"),
                            occupation: (req.body.father !== undefined ? req.body.father.occupation : "NA"),
                            annualIncome: (req.body.father !== undefined ? req.body.father.annualIncome : 0),
                            phoneNumber: (req.body.father !== undefined ? req.body.father.phoneNumber : "NA"),
                            email: (req.body.father !== undefined ? req.body.father.email : "NA")
                        },
                        mother: {
                            name: (req.body.mother !== undefined ? req.body.mother.name : "NA"),
                            age: (req.body.mother !== undefined ? req.body.mother.age : 0),
                            qualification: (req.body.mother !== undefined ? req.body.mother.qualification : "NA"),
                            occupation: (req.body.mother !== undefined ? req.body.mother.occupation : "NA"),
                            annualIncome: (req.body.mother !== undefined ? req.body.mother.annualIncome : 0),
                            phoneNumber: (req.body.mother !== undefined ? req.body.mother.phoneNumber : "NA"),
                            email: (req.body.mother !== undefined ? req.body.mother.email : "NA")
                        },
                        guardian: {
                            name: (req.body.guardian !== undefined ? req.body.guardian.name : "NA"),
                            age: (req.body.guardian !== undefined ? req.body.guardian.age : 0),
                            qualification: (req.body.guardian !== undefined ? req.body.guardian.qualification : "NA"),
                            occupation: (req.body.guardian !== undefined ? req.body.guardian.occupation : "NA"),
                            annualIncome: (req.body.guardian !== undefined ? req.body.guardian.annualIncome : 0),
                            phoneNumber: (req.body.guardian !== undefined ? req.body.guardian.phoneNumber : "NA"),
                            email: (req.body.guardian !== undefined ? req.body.guardian.email : "NA")
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
                    student.save()
                        .then(docs => {
                            const transporter = nodemailer.createTransport({
                                service: 'gmail',
                                auth: {
                                    user: process.env.NODEMAIL,
                                    pass: process.env.NODEMAIL_PASSWORD
                                }
                            }).sendMail(mailOptions, (error, info) => {
                                if (error) {
                                    console.log(error);
                                } else {
                                    res.status(201).json({
                                        message: "User Created and Mail Sent"
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
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post("/login", (req, res, next) => {
    Students.find({ userID: req.body.userID }).exec()
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
                        var token = jwt.sign({
                            userID: docs[0].userID,
                            _id: docs[0]._id
                        }, process.env.JWT_KEY, {
                            expiresIn: "1h"
                        });
                        res.status(200).json({
                            message: "Auth Successful",
                            _id: docs[0]._id,
                            token: token
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


router.get("/", checkAuth, (req, res, next) => {
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

router.get("/:id", checkAuth, (req, res, next) => {
    Students.findById(req.params.id).exec()
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

router.patch("/userID", checkAuth, (req, res, next) => {
    var id = req.body.id;
    if (req.userData._id !== id) {
        res.status(401).json({
            message: "Auth Failed"
        })
    }
    else {
        var currentUserID = req.body.currentUserID;
        var newUserID = req.body.newUserID;
        var password = req.body.password;
        Students.find({ userID: newUserID }).exec()
            .then(docs => {
                if (docs.length >= 1) {
                    res.status(409).json({
                        message: "User ID Already Exists"
                    })
                } else {
                    Students.findById(id).exec()
                        .then(doc => {
                            if (doc === null) {
                                res.status(404).json({
                                    message: "Student Not Found"
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
                                        Students.findByIdAndUpdate(id, { userID: newUserID }).exec()
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
                }
            }).catch(err => {
                res.status(500).json({
                    error: err
                })
            })
    }
});

router.patch("/password", checkAuth, (req, res) => {
    if (req.userData._id !== req.body.id) {
        res.status(401).json({
            message: "Auth Failed"
        });
    } else {
        var id = req.body.id;
        var currentPassword = req.body.currentPassword;
        var newPassword = req.body.newPassword;
        Students.findById(id).exec()
            .then(doc => {
                bcrypt.compare(currentPassword, doc.password, (err, response) => {
                    if (err) {
                        res.status(401).json({
                            message: "Auth Failed"
                        });
                    }
                    if (response) {
                        bcrypt.hash(newPassword, 10, (err, hash) => {
                            Students.findByIdAndUpdate(id, { password: hash }).exec()
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
    }
});

router.patch("/:id", checkAuth, (req, res, next) => {
    var id = req.params.id;
    var updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Students.findByIdAndUpdate(id, updateOps).exec()
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

router.delete("/:id", checkAuth, (req, res, next) => {
    var id = req.params.id;
    Students.findByIdAndDelete(id).exec()
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