const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// const users = [];
const usersFilePath = path.resolve(__dirname, '..', 'data', 'users.json');
console.log(usersFilePath);

function getUsers() {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
}

function addUser(newUser) {
    const users = getUsers();
    users.push(newUser);
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
}


const JWT_SECRET = 'ILOVECHEESE';
// Sign-up route: Register a new user
router.post('/signup', async (req, res) => {

    const { email, password } = req.body;
    // const users = JSON.parse(fs.readFileSync(usersFilePath));
    let users = getUsers();
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { email, password: hashedPassword }
    addUser(newUser);
    users = getUsers();
    res.status(201).json({ message: 'User registered successfully.' });
});

router.post('/login', async (req, res) => {
    const users = getUsers();
    const { email, password } = req.body;
    const user = users.find(user => user.email === email);
    if (!user) {
        return res.status(400).json({ message: 'User not found.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    console.log("line 64 auth.js" + token);
    res.status(200).json({ message: 'Login successful.', token });
});


// Export the router and middleware
module.exports = router;