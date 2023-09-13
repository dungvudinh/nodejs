const Course = require('../models/Course');

class MeController {
    //[GET] me/stored/courses
    async storedCourses(req, res, next) {
        try {
            const countDocument = await Course.countWithDeleted({
                deleted: true,
            });
            let courses = await Course.find({}).sortable(req).lean();
            res.render('me/storedCourse', { courses, countDocument });
        } catch (error) {
            next(error);
        }
    }
    //[GET] me/stored/news
    storedNews(req, res, next) {
        res.send('stored news page');
    }
    async trashCourses(req, res, next) {
        try {
            const courses = await Course.findWithDeleted({
                deleted: true,
            }).lean();
            res.render('me/trashCourse', { courses });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new MeController();
