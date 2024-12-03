const event = require("events");
const emitter = new event.EventEmitter();

module.exports = {
    emitter,
    events: {
        RESERVATION_CREATED: "RESERVATION_CREATED",
        // EVENT_UPDATED: "EVENT_UPDATED",
        // EVENT_DELETED: "EVENT_DELETED",
        // TEST_EMITTER: "TEST_EMITTER"
    }
};