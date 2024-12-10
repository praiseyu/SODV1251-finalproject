// const jwt = require('jsonwebtoken');

// const JWT_SECRET = 'ILOVECHEESE';


// const authenticate = (req, res, next) => {
//     console.log(req.headers['authorization']);
//     console.log("line7middleware")

//     const token = req.headers['authorization']?.split(' ')[1];
//     console.log(token);
//     if (!token) {
//         console.log("still not token line 13 middleware");

//     }

//     try {
//         const decoded = jwt.verify(token, JWT_SECRET);
//         req.user = decoded;
//         console.log(decoded, "line 19");
//         next();
//     } catch (err) {
//         console.log("catch block line 22 authentication.js")
//         return res.redirect('/signup');
//     }
//     console.log("authenticate!!!");
//     // next();
// }

// module.exports = { authenticate };