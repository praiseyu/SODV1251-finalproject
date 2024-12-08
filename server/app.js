require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const app = express();
const PORT = process.env.PORT || 8080;
// const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5500";
const authRoutes = require('./routes/auth');
const routes = require('./routes/routes')
require('./utils/events/eventlisteners');

// import "./utils/events/eventlisteners.js";

// app.use(cors({ origin: CORS_ORIGIN }));





app.use(express.json());
app.use(
    "/bootstrap",
    express.static(path.join(__dirname, "../node_modules/bootstrap/dist"))
);

app.use(express.static(path.resolve('..', 'public')));
app.use('/auth', authRoutes);
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is listening http://localhost:${PORT}`);
})