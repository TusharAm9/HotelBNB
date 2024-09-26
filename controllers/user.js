const User=require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("User/signup.ejs");
};
module.exports.signupReq = async(req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser= new User({email,username});
        const addedUser = await User.register(newUser,password);
        console.log(addedUser);
        req.login(addedUser,(err) =>{
            if(err){
                return next(err);
            }
        req.flash("success","Welcome to HotailBNB!");
        res.redirect("/listings");
        })
        
    } catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
};

module.exports.renderLoginForm = (req,res)=>{
    res.render("User/login.ejs");
};

module.exports.loginReq = async(req,res)=>{
    req.flash("success","Welcome Back to HotailBNB");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
};

module.exports.logOutReq = (req,res,next)=>{
    req.logout((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You are Successfuly Loged Out!");
        res.redirect("/listings");
    })
}