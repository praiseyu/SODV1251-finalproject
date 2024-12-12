const express = require('express');
const passport = require('../config/passport');
const router = express.Router();
const path = require('path');
const { events, emitter } = require("../utils/events/eventindex");
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const fs = require("fs");
const bcrypt = require("bcryptjs");
const pathController = require("../controllers/controllers");

const usersFilePath = path.resolve('data', 'users.json');

router.route('/login').get(pathController.getLoginPage)
    .post(pathController.postLoginReq);

// router.route('/login')
//     .get((req, res) => {
//         res.sendFile(path.resolve('..', 'views', 'login.html'));
//     })
//     .post((req, res, next) => {
//         passport.authenticate('local', (err, user, info) => {
//             if (err) {
//                 return next(err);
//             }
//             if (!user) {
//                 return res.status(401).json({ message: 'Invalid email or password' });
//             }
//             req.logIn(user, (err) => {
//                 if (err) {
//                     return next(err);
//                 }
//                 return res.status(200).json({ message: 'Login successful', name: user.name, redirect: '/flights' });
//             });
//         })(req, res, next);
//     });

router.route("/").get(pathController.getLandingPage);

// router.get('/', (req, res) => {
//     res.sendFile(path.resolve('..', 'views', 'landingpage.html'));
// })

// router.get('/signup', (req, res) => {
//     res.sendFile(path.resolve('..', 'views', 'signup.html'));
// });
router.route("/signup").get(pathController.getSignupPage).post(pathController.createNewAccount);
router.route("/flights").get(ensureAuthenticated, pathController.getFlightsPage).post(ensureAuthenticated, pathController.createFlightReservation);

// router.get('/flights', ensureAuthenticated, (req, res) => {
//     console.log("authroutes27")
//     const indexPath = path.resolve('..', 'views', 'index.html');
//     res.sendFile(indexPath);
// })

// router.post('/flights', ensureAuthenticated, (req, res) => {
//     const userEmail = req.user.email;
//     const flightDetails = req.body;
//     try {
//         emitter.emit(events.RESERVATION_CREATED, userEmail, flightDetails);
//         res.redirect('/thankyou');
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//         console.error(`Error creating reservation: ${err.message}.`);
//     }
// })

router.route("/user").get(ensureAuthenticated, pathController.getUserInfo);
// router.get('/user', ensureAuthenticated, (req, res) => {
//     res.json({ name: req.user.name, email: req.user.email });
// });

router.route("/thankyou").get(ensureAuthenticated, pathController.getThankyouPage);
// router.get('/thankyou', ensureAuthenticated, (req, res) => {
//     res.sendFile(path.resolve('..', 'views', 'thankyou.html'));
// })

// router.post("/signup", async (req, res) => {
//     const { name, email, password, confirmPassword } = req.body;

//     if (password !== confirmPassword) {
//         return res.status(400).json({ message: "Passwords do not match." });
//     }
//     if (!email || !password) {
//         return res.status(400).json({ message: "Email and password cannot be null" })
//     }
//     const users = JSON.parse(fs.readFileSync(usersFilePath));

//     if (users.find(user => user.email === email)) {
//         return res.status(400).json({ message: "Email already exists." });
//     }

//     try {
//         const hashedPwd = await bcrypt.hash(password, 10);
//         const newUser = { name, email, password: hashedPwd };
//         users.push(newUser);
//         fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
//         res.status(201).json({ message: "Account succesfully created." });
//     } catch {
//         console.error("Error hashing password:", err);
//         res.status(500).json({ message: "An error occurred." });
//     }

// })

// router.post('/logout', function (req, res, next) {
//     req.logout(function (err) {
//         if (err) { return next(err); }
//         res.status(200).json({ message: 'Logged out successfully' });
//     });
// });

router.route("/logout").post(pathController.logoutUser);



module.exports = router;