var jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ");
        console.log(token[1]);
        const decoded = jwt.verify(token[1], process.env.JWT_KEY);
        req.userData = decoded;
        next();
    }catch(err){
        res.status(401).json({
            message : "Auth Failed"
        });
    }
}