const express = require("express");
const userController = require("../controllers/Users");
const router = express.Router();

router.post("/sendotp", userController.userSendOTP);
router.post("/signup",userController.userSignup);
router.post("/login",userController.userLogin);
router.get("/", userController.getAllUsers);
router.get("/:userID", userController.getUserByID);
router.patch("/:userID", userController.patchUser);
router.delete("/:userID", userController.deleteUser);
module.exports = router;
