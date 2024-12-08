const router = require('express').Router();
const { events, emitter } = require("../utils/events/eventindex");
const path = require('path');

const { authenticate } = require('../middleware/authentication');
// POST: reservation confirmation
// send email confirmation

router.get('/', (req, res) => {
    // const indexPath = path.resolve('..', 'views', 'index.html');
    // res.sendFile(indexPath);
    res.sendFile(path.resolve('..', 'views', 'signup.html'));
})

router.get('/validate', authenticate, (req, res) => {
    res.status(200).json({ message: 'Token valid' });
})

router.get('/flights', authenticate, (req, res) => {
    // console.log(req.body)
    const indexPath = path.resolve('..', 'views', 'index.html');
    res.sendFile(indexPath);
})

router.get('/login', (req, res) => {
    res.sendFile(path.resolve('..', 'views', 'login.html'));
})

router.get('/signup', (req, res) => {
    res.sendFile(path.resolve('..', 'views', 'signup.html'));
})

// post to create newe reservation and return thank you page if succesful
router.post('/', (req, res) => {
    const { email } = req.body;
    const user = req.user;
    try {
        // emitter.emit(events.RESERVATION_CREATED, email);
        const thankyouPath = path.resolve('..', 'views', 'thankyou.html');
        console.log(thankyouPath);
        // res.sendFile(path.resolve('..', 'views', 'thankyou.html'));
        console.log('26')
        res.redirect('/thankyou');
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.error(`Error creating reservation: ${err.message}.`);
    }
})

router.post('/search', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "Search endpoint." });
})

router.get('/thankyou', (req, res) => {
    res.sendFile(path.resolve('..', 'views', 'thankyou.html'));
})

module.exports = router;
// export default router;

