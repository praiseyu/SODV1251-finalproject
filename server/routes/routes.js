const router = require('express').Router();
const { events, emitter } = require("../utils/events/eventindex");
const path = require('path');

// import { Router } from "express";
// import { events, emitter } from "../utils/events/eventindex.js";
// import path from "path";
// const router = Router();



// POST: reservation confirmation
// send email confirmation

router.get('/', (req, res) => {
    const indexPath = path.resolve('..', 'views', 'index.html');
    res.sendFile(indexPath);
})

// post to create newe reservation and return thank you page if succesful
router.post('/', (req, res) => {
    const { email } = req.body;
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

