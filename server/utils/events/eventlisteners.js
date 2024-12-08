const { events, emitter } = require("./eventindex");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0c928b4b63c14d",
        pass: "e4053b9c2d5a0e",
    }
});

emitter.on(events.RESERVATION_CREATED, async (email, flightDetails) => {
    try {
        console.log("eventlisteneres flight detials")
        console.log(flightDetails);
        const mailOptions = {
            from: "flightreservation@flights.com",
            to: email,
            subject: `Reservation Confirmation`,
            text: `Thank you for booking your flight with us.\nYour ${flightDetails.triptype} flight to ${flightDetails.arrivalCity} departs from ${flightDetails.departureCity} on ${flightDetails.departureDate}. ${flightDetails.returnDate ? `Your return flight leaves ${flightDetails.arrivalCity} on ${flightDetails.returnDate}` : ""}`
        }
        await transporter.sendMail(mailOptions);

    } catch (err) {
        console.error(`Error sending reminder emails: ${err}`);
    }
})


