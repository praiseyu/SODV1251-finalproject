require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
require('./utils/events/eventlisteners');

const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const authRoutes = require('./routes/authRoutes');
require('./config/passport');


app.use(session({
    secret: 'ILOVECHEESE',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(
    "/bootstrap",
    express.static(path.join(__dirname, "../node_modules/bootstrap/dist"))
);

app.use(express.static(path.resolve('..', 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRoutes);

app.listen(PORT, () => {
    console.log(`Server is listening http://localhost:${PORT}`);
})