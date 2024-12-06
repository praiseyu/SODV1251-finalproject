const event = require("events");
const emitter = new event.EventEmitter();
// import { EventEmitter } from "events";
// const emitter = new EventEmitter();

module.exports = {
    emitter,
    events: {
        RESERVATION_CREATED: "RESERVATION_CREATED",
    }
};

// export const events = {
//     RESERVATION_CREATED: "RESERVATION_CREATED",
// }

// export { emitter };