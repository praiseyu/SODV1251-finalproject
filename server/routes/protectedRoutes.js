const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const path = require('path');

router.get('/flights', ensureAuthenticated, (req, res) => {
    const indexPath = path.resolve('..', 'views', 'index.html');
    res.sendFile(indexPath);
})


module.exports = router;