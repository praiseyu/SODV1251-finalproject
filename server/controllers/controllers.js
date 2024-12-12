const fs = require("fs");
const path = require("path");
const passport = require("../config/passport");
const { events, emitter } = require("../utils/events/eventindex");
const bcrypt = require("bcryptjs");

const usersFilePath = path.resolve('data', 'users.json');

function getLoginPage(req, res) {
    res.sendFile(path.resolve('..', 'views', 'login.html'));
}

function postLoginReq(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json({ message: 'Login successful', name: user.name, redirect: '/flights' });
        });
    })(req, res, next);
}

function getLandingPage(req, res) {
    res.sendFile(path.resolve('..', 'views', 'landingpage.html'));
}

function getSignupPage(req, res) {
    res.sendFile(path.resolve('..', 'views', 'signup.html'));
}

async function createNewAccount(req, res) {
    const { name, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
        return res.status(400).json({ message: "Passwords do not match." });
    }
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password cannot be null" })
    }
    const users = JSON.parse(fs.readFileSync(usersFilePath));

    if (users.find(user => user.email === email)) {
        return res.status(400).json({ message: "Email already exists." });
    }

    try {
        const hashedPwd = await bcrypt.hash(password, 10);
        const newUser = { name, email, password: hashedPwd };
        users.push(newUser);
        fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
        res.status(201).json({ message: "Account succesfully created." });
    } catch {
        console.error("Error hashing password:", err);
        res.status(500).json({ message: "An error occurred." });
    }
}

function logoutUser(req, res, next) {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.status(200).json({ message: 'Logged out successfully' });
    });
}

function getFlightsPage(req, res) {
    const indexPath = path.resolve('..', 'views', 'index.html');
    res.sendFile(indexPath);
}

function createFlightReservation(req, res) {
    const userEmail = req.user.email;
    const flightDetails = req.body;
    try {
        emitter.emit(events.RESERVATION_CREATED, userEmail, flightDetails);
        res.redirect('/thankyou');
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error creating reservation: ${err.message}.`);
    }
}

function getUserInfo(req, res) {
    res.json({ name: req.user.name, email: req.user.email });
}

function getThankyouPage(req, res) {
    res.sendFile(path.resolve('..', 'views', 'thankyou.html'));
}

module.exports = { getLoginPage, postLoginReq, getLandingPage, getSignupPage, createNewAccount, logoutUser, getFlightsPage, createFlightReservation, getUserInfo, getThankyouPage };