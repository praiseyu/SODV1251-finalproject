const { events, emitter } = require("./eventindex");
const transporter = require('../transporter/transporterConfig');

emitter.on(events.RESERVATION_CREATED, async (email, flightDetails) => {
    try {
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


