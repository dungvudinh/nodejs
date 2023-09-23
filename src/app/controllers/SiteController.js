// const Course = require('../models/Course');
const courseService = require('../services/course.service');
const AccountService = require('../services/account.service');

// const User = require('../models/User');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 2 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, "dungg'secret", {
        expiresIn: maxAge,
    });
};

// const handleError = (err) => {
//     let errors = { name: '', email: '', password: '' };
//     console.log(err.message);
//     //incorrect email
//     if (err.message === 'Incorrect email') {
//         errors.email = 'that email is not registered';
//     }
//     if (err.message === 'Incorrect password') {
//         errors.email = 'that password is incorrect';
//     }
//     if (err.code === 11000) {
//         errors.email = 'Email already exists';
//         return errors;
//     }
//     if (err.message.includes('User validation failed')) {
//         console.log(err);
//         Object.values(err.errors).forEach(({ properties }) => {
//             errors[properties.path] = properties.message;
//         });
//     }
//     return errors;
// };
class SiteController {
    async home(req, res, next) {
        console.log(req.query);
        const PAGE_SIZE = 8;
        const page = req.query.page ? parseInt(req.query.page) : 1;
        try {
            const skip = (page-1) * PAGE_SIZE;
            const limit = PAGE_SIZE;
            const  courses  =  await courseService.getAllCourses(limit, skip);
            const countDocument = await courseService.getNOFCourse();
            // const courses = await Course.find({})
            //     .skip((page - 1) * PAGE_SIZE)
            //     .limit(PAGE_SIZE)
            //     .lean();
            res.render('home', {
                courses,
                count: countDocument,
                currentPage: page,
            });
        } catch (error) {
            next(error);
        }
    }
    upload(req, res) {
        res.render('upload');
    }
    async signup(req, res, next) {


        const { name, email, password } = req.body;
        await AccountService.create({name, email, password},(err, result)=>{
            if(err)
                res.status(500).json({errors: err})
            else 
            {
                const accountId = result.insertId;
                const token = createToken(accountId);
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                res.status(201).json({ user:accountId });
            }
        } )
    }
    signupView(req, res, next) {
        res.render('user/signup', { layout: 'author' });
    }

    async login(req, res, next) {
        const { email, password } = req.body;
            await AccountService.login({email, password}, (err,  user)=>
            {
                if(err)
                {
                    res.status(500).json({errors: err})
                }
                else 
                {
                    const token = createToken(user.account_id);
                    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                    res.status(200).json({ user: user.account_id });
                }
               
            });
           
        // } catch (err) {
        //     // const errors = handleError(err);
        //     res.status(400).json({ errors:err });
        // }
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
