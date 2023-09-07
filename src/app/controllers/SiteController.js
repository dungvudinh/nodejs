const Course = require('../models/Course');
class SiteController {
    async home(req, res, next) {
        try {
            const courses = await Course.find({}).lean();
            res.render('home', { courses });
        } catch (error) {
            next(error);
        }
    }
    upload(req, res) {
        res.render('upload');
    }
    login(req, res) {
        res.render('login');
    }
}

module.exports = new SiteController();
