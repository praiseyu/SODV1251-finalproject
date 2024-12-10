const event = require("events");
const emitter = new event.EventEmitter();

module.exports = {
    emitter,
    events: {
        RESERVATION_CREATED: "RESERVATION_CREATED",
    }
};