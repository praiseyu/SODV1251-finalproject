require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
require('./utils/events/eventlisteners');

const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const flash = require('connect-flash');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/protectedRoutes');
const passportConfig = require('./config/passport')


// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5500";

// json webtoken
// const authRoutes = require('./routes/auth');
// const routes = require('./routes/routes')

// new update




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