const { events, emitter } = require('./eventindex');
const nodemailer = require('nodemailer');

// import { events, emitter } from "./eventindex.js";
// import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0c928b4b63c14d",
        pass: "e4053b9c2d5a0e",
    }
});

emitter.on(events.RESERVATION_CREATED, async (email) => {
    try {

        const mailOptions = {
            from: "flightreservation@flights.com",
            to: email,
            subject: `Reservation Confirmation`,
            text: `Thank you for booking your flight with us. You will receive updates at the email you have provided: ${email}.`
        }
        await transporter.sendMail(mailOptions);

    } catch (err) {
        console.error(`Error sending reminder emails: ${err}`);
    }
})


