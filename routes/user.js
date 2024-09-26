const express=require("express");
const router = express.Router();
const wrapAsync=require("../utils/wrapAsync.js");
const passport = require("passport");
const { savedRedirectUrl } = require("../middleWare.js");

const userController = require("../controllers/user.js")


router
    .route("/signup")
    .get(userController.renderSignupForm)
    .post(wrapAsync(userController.signupReq));

router
    .route("/login")
    .get(userController.renderLoginForm)
    .post(savedRedirectUrl, passport.authenticate('local', { failureRedirect: '/login' ,failureFlash:true}),userController.loginReq);


router.get("/logout",userController.logOutReq);

module.exports = router;