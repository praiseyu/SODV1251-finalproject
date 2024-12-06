require('dotenv').config();
const cors = require('cors');
const express = require('express');
const path = require('path');
// import 'dotenv/config';
// import express from "express";
// import cors from "cors";
// import path from "path";
// import router from "./routes/routes.js";
const app = express();
const PORT = process.env.PORT || 8080;
// const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5500";
const routes = require('./routes/routes')
require('./utils/events/eventlisteners');

// import "./utils/events/eventlisteners.js";

// app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());
app.use(express.static(path.resolve('..', 'public')));
app.use('/', routes);

app.listen(PORT, () => {
    console.log(`Server is listening http://localhost:${PORT}`);
})