function ensureAuthenticated(req, res, next) {
    console.log("middleware line 2");
    console.log("Authenticated:", req.isAuthenticated());
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}

module.exports = ensureAuthenticated;