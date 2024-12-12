const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcryptjs");
const userDataPath = path.resolve("data", "users.json");
const rawData = fs.readFileSync(userDataPath);
const users = JSON.parse(rawData);

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    async (email, password, done) => {
        const user = users.find(u => u.email === email);
        if (!user) {
            return done(null, false, { message: "Incorrect email." });
        }

        try {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return done(null, false, { message: "Password is incorrect." });
            }
            return done(null, user);
        } catch (err) {
            console.error("Error with password.", err);
            return done(err);
        }

    }
));

passport.serializeUser((user, done) => {
    done(null, user.email);
});

passport.deserializeUser((email, done) => {
    const user = users.find(u => u.email === email);
    done(null, user);
});

module.exports = passport;