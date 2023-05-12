var nodemailer = require('nodemailer');
var express = require('express');
var router = express.Router();

router.post("/", (req, res, next) => {
    const mailOptions = {
        from: req.body.email,
        to: "sanjay.nithin19@gmail.com",
        subject: req.body.subject,
        text: "Name : " + req.body.name + "\nEmail : " + req.body.email + "\nSubject : " + req.body.subject + "\nMessage : " + req.body.message
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
                res.status(200).json({
                    message: "Mail Sent Successfully"
                });
            }
        });
});

module.exports = router;