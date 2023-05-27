const User = require("../model/user")


module.exports.renderSignupForm = (req, res) => {
    res.render("users/signup")
}
module.exports.create = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const user = new User({username, email})
        const regUser = await User.register(user, password)
        // console.log(regUser)
        req.login(regUser, err => {
            if(err) return next(err);
                req.flash("success", "Account Created, Welcome to Healthagram")
                res.redirect("posts")
        })  
    }
    catch(e) {
        req.flash("error", e.message)
        res.redirect("signup")
    }
}

module.exports.renderLoginForm = (req, res) => {
    res.render("users/login")
}
module.exports.login = (req, res) => {
    req.flash("success", "Welcome Home!")
    const redirectUrl = res.locals.returnTo || '/posts';
    // console.log(redirectUrl)
    res.redirect(redirectUrl)
}
module.exports.logout = (req, res) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash("success", "You are now logged out")
        res.redirect("posts")
    });
}