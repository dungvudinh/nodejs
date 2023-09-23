const jwt = require('jsonwebtoken');
// const User = require('../models/User');
const query = require('../../config/db/backend');
const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "dungg'secret", (err, decodedToken) => {
            if (err) {
                console.log(err);
                res.redirect('/login');
            } else {
                console.log(decodedToken);
                next();
            }
        });
    } else res.redirect('/login');
};

const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    if (token) {
        jwt.verify(token, "dungg'secret", async (err, decodeToken) => {
            if (err) {
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                let [user] = await query("SELECT * FROM account WHERE account_id = ?" , [decodeToken.id]);
                res.locals.user = user.name;
                next();
            }
        });
    } else {
        res.locals.user = null;
        next();
    }
};
module.exports = { requireAuth, checkUser };
