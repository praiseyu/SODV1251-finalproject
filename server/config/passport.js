const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const users = [
    { id: 1, name: "John Smith", email: "test@example.com", password: "222" },
    { id: 2, name: "Jessica Whitman", email: "user2@example.com", password: "123" },
    { id: 3, name: "Boo Who", email: "boo@123.com", password: "123" },
    { id: 4, name: "Mike Wazowski", email: "boo@1.com", password: "123" }
];

passport.use(new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
},
    (email, password, done) => {
        const user = users.find(u => u.email === email);
        if (!user) {
            console.log("User not found");
            return done(null, false, { message: "Incorrect email." });
        }
        if (user.password !== password) {
            console.log("Incorrect password");
            return done(null, false, { message: "Incorrect password." });
        }
        console.log("Login successful:", user);
        return done(null, user);
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