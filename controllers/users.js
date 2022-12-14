const User  = require("../models/user")

module.exports.renderRegister = (req , res ) => {
    res.render("users/register")
}

module.exports.CreateUser = async (req , res ,next) => {
    try{
    const {email , username , password} = req.body;
    const user = new User({email , username});
    const registeredUser = await User.register(user , password)
    req.login(registeredUser , (e) => {
        if(e) {
            return next(e);
        }
        req.flash("success" , "Welcome to Yelp Camp!")
        res.redirect("/campgrounds")
    })
    }catch (e) {
        req.flash("error" , e.message);
        res.redirect("/register")
    } 
}

module.exports.renderLogin = (req ,res ) => {
    res.render("users/login")
}

module.exports.authenticateUser = (req ,res ) => {
    req.flash("success" , "Welcome Back !!")
    const redirectUrl = req.session.returnTo || "/campgrounds"
    res.redirect(redirectUrl);
}

module.exports.logoutUser = async (req ,res ,next) => {
    req.logout((e) => {
        if(e) {
            return next(e);
        }
        req.flash("success" , "Goodbye , Hope to see you again!!")
        res.redirect("/campgrounds")
    });
}