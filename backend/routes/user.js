const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const userController = require("../controllers/user.js");

router
.route("/signup")
//user signup route
.post(wrapAsync(userController.userSignupPost));

router
.route("/login")
.post(
    passport.authenticate("local", {session : true}), 
    userController.userLoginPost
);

//user logout route
router.get("/logout", userController.userLogout);

module.exports = router;