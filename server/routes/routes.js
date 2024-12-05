// const router = require('express').Router();
// const { events, emitter } = require("../utils/events/eventindex");
import { Router } from "express";
import { events, emitter } from "../utils/events/eventindex.js"

// POST: reservation confirmation
// send email confirmation
const router = Router();

router.post('/confirmation', (req, res) => {
    // emit event 
    emitter.emit(events.RESERVATION_CREATED, userInfo);
})

router.post('/search', (req, res) => {
    console.log(req.body);
    res.status(200).json({ message: "Search endpoint." });
})

// module.exports = { router }
export default router;

