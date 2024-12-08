const express = require('express');
const passport = require('../config/passport');
const router = express.Router();
const path = require('path');
const { events, emitter } = require("../utils/events/eventindex");
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

// const passport = require('passport');
// const users = [
//     { id: 1, name: "John Smith", email: "test@example.com", password: "222" },
//     { id: 2, name: "Jessica Whitman", email: "user2@example.com", password: "123" },
//     { id: 3, name: "Boo Who", email: "boo@123.com", password: "123" },
//     { id: 4, name: "Mike Wazowski", email: "boo@1.com", password: "123" }
// ];

router.get('/login', (req, res) => {
    res.sendFile(path.resolve('..', 'views', 'login.html'));
});

router.post('/login', (req, res, next) => {
    console.log(req.body);
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            return next(err);
        }
        if (!user) {

            console.log("invalid email or password");
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            console.log('User logged in:', user);

            return res.status(200).json({ message: 'Login successful', redirect: '/flights' });
        });
    })(req, res, next);
});

router.get('/signup', (req, res) => {
    res.sendFile(path.resolve('..', 'views', 'signup.html'));
});

router.get('/flights', ensureAuthenticated, (req, res) => {
    console.log("authroutes27")
    const indexPath = path.resolve('..', 'views', 'index.html');
    res.sendFile(indexPath);
})

router.get('/user', ensureAuthenticated, (req, res) => {
    res.json({ name: req.user.name, email: req.user.email });
});

router.get('/thankyou', ensureAuthenticated, (req, res) => {
    res.sendFile(path.resolve('..', 'views', 'thankyou.html'));
})


router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.status(200).json({ message: 'Logged out successfully' });
    });
});

router.post('/flights', ensureAuthenticated, (req, res) => {
    const userEmail = req.user.email;
    const flightDetails = req.body;
    try {
        emitter.emit(events.RESERVATION_CREATED, userEmail, flightDetails);
        res.redirect('/thankyou');
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error creating reservation: ${err.message}.`);
    }
})


module.exports = router;