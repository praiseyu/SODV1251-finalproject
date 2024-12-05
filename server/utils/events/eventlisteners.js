// const { events, emitter } = require('./eventindex');
// const nodemailer = require('nodemailer');

import { events, emitter } from "./eventindex.js";
import nodemailer from "nodemailer";


const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0c928b4b63c14d",
        pass: "e4053b9c2d5a0e",
    }
});

emitter.on(events.RESERVATION_CREATED, async (person) => {
    try {

        const mailOptions = {
            from: "flightreservation@flights.com",
            to: person.email,
            subject: `Reservation Confirmation: ${person.name}`,
            text: `Thank you for booking your flight with us. You will receive updates at the email you have provided: ${person.email}.`
        }
        await transporter.sendMail(mailOptions);

    } catch (err) {
        console.error(`Error sending reminder emails: ${err}`);
    }
})

emitter.on(events.REMINDER_EMAIL, async (eventData) => {
    const { event_id } = eventData;
    try {
        const event = await Event.findOne({
            where: { event_id: event_id },
            include: {
                model: Attendee,
                through: { attributes: [] },
                as: 'attendees'
            }
        });

        if (!event) {
            console.error(`Event with ID ${eventId} not found.`);
        }

        const attendees = currentEvent.attendees;
        for (const attendee of attendees) {
            const mailOptions = {
                from: "communitycentre@email.com",
                to: attendee.email,
                subject: `Reminder: Upcoming Event: ${event.title}`,
                text: `This is a reminder that you have an upcoming event, "${event.title}", scheduled at ${event.time.slice(0, 5)} on ${new Date(event.event_date).toDateString()}.`,
            }
            await transporter.sendMail(mailOptions);
        }

    } catch (err) {
        console.error(`Error sending reminder emails: ${err}`);
    }
})

emitter.on(events.TEST_EMITTER, () => {

})
