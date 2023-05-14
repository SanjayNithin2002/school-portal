var admin = require("firebase-admin");
var serviceAccount = require("../../serviceAccountKey.json");
var express = require('express');
var router = express.Router();
var checkAuth = require('../middleware/checkAuth');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.BUCKET_URL
}, "downloadFile");

var bucket = admin.storage().bucket();

router.get("/:location/:filename", checkAuth, (req, res) => {
    var location = req.params.location;
    var filename = req.params.filename;
    var filepath = location + "/" + filename;
    var file = bucket.file(filepath);
    var options = {
        version: 'v4',
        action: 'read',
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7 // one week
    };
    file.getSignedUrl(options)
        .then(url => {
            res.status(200).json({
                url : url
            });
        }
        ).catch(err => {
            res.status(500).json({
                error: err
            });
        }
        );
});

module.exports = router;