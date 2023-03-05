const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");


const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get("/",(req, res)=> {
    res.status(202).json({
        message : "How are you doing?"
    })
});


module.exports = app;

