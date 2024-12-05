// const nodemailer = require('nodemailer');
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "0c928b4b63c14d",
        pass: "e4053b9c2d5a0e",
    }
});

// module.exports = { transporter };
export { transporter };