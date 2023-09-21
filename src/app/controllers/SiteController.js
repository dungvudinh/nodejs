// const Course = require('../models/Course');
const query = require('../../config/db');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 2 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "dungg'secret", {
        expiresIn: maxAge,
    });
};

const handleError = (err) => {
    let errors = { name: '', email: '', password: '' };
    console.log(err.message);
    //incorrect email
    if (err.message === 'Incorrect email') {
        errors.email = 'that email is not registered';
    }
    if (err.message === 'Incorrect password') {
        errors.email = 'that password is incorrect';
    }
    if (err.code === 11000) {
        errors.email = 'Email already exists';
        return errors;
    }
    if (err.message.includes('User validation failed')) {
        console.log(err);
        Object.values(err.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        });
    }
    return errors;
};
class SiteController {
    async home(req, res, next) {
        // console.log(req.query);
        // const PAGE_SIZE = 8;
        // const page = req.query.page ? parseInt(req.query.page) : 1;
        try {
            const  data  =  await query('SELECT  * FROM course');
            res.json(data);
            // const countDocument = await Course.count({});
            // const courses = await Course.find({})
            //     .skip((page - 1) * PAGE_SIZE)
            //     .limit(PAGE_SIZE)
            //     .lean();
            // res.render('home', {
            //     courses,
            //     count: countDocument,
            //     currentPage: page,
            // });
        } catch (error) {
            next(error);
        }
    }
    upload(req, res) {
        res.render('upload');
    }
    async signup(req, res, next) {
        try {
            const { name, email, password } = req.body;
            const user = await User.create({ name, email, password });
            const token = createToken(user._id);
            console.log(token);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(201).json({ user: user._id });
        } catch (err) {
            const errors = handleError(err);
            res.status(400).json({ errors });
        }
    }
    signupView(req, res, next) {
        res.render('user/signup', { layout: 'author' });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);
            res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
            res.status(200).json({ user: user._id });
        } catch (err) {
            const errors = handleError(err);
            res.status(400).json({ errors });
        }
    }
    loginView(req, res, next) {
        res.render('user/login', { layout: 'author' });
    }
    logout(req, res, next) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/login');
    }
}

module.exports = new SiteController();
