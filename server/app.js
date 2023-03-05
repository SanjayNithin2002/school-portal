const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const studentRoutes = require("./api/routes/Students");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

// handling CORS
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Accept, Authorization, Content-Type");
    if(req.method === 'OPTIONS'){
        res.header(
            "Access-Control-Allow-Methods", 
            "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

//Mongo DB connection
mongoose.connect("mongodb+srv://sanjaynithin2002:" +process.env.MONGODB_PASSWORD +  "@cluster0.kgz6ota.mongodb.net/?retryWrites=true&w=majority")


// routes
app.get("/",(req, res)=> {
    res.status(202).json({
        message : "How are you doing?"
    })
});

app.use("/students", studentRoutes);


// handling Not Found errors
app.use((req,res,next)=>{
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});
app.use((error, req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error : {
            message : error.message
        }
    });
});

module.exports = app;

