const Course = require('../models/Course');
const upload = require('../../config/uploadMiddleware');

class CourseController {
    //[GET] courses/detail
    async detail(req, res, next) {
        try {
            const courseId = await req.params.courseId;
            const result = await Course.findOne({ slug: courseId }).lean();
            res.render('course/detail', { course: result });
        } catch (error) {
            next(error);
        }
    }
    //[GET] courses/create
    create(req, res, next) {
        res.render('course/create');
    }
    //[POST] courses/store
    store(req, res, next) {
        try {
            upload.single('image_url')(req, res, (error) => {
                if (error) console.log('upload fail');
                else {
                    const formData = req.body;
                    formData.image_url = req.file.filename;
                    Course.create(formData);
                    res.redirect('/me/stored/courses');
                }
            });
        } catch (error) {
            next(error);
        }
    }
    //[GET] courses/:id/edit
    async edit(req, res, next) {
        try {
            const course = await Course.findById(req.params.id).lean();
            res.render('course/edit', { course });
        } catch (error) {
            next(error);
        }
    }
    //[PUT] courses/:id
    async update(req, res, next) {
        try {
            const formData = req.body;
            if (req.file) formData.image_url = req.file.filename;
            else formData.image_url = formData['old_image'];
            console.log(formData);
            await Course.updateOne({ _id: req.params.id }, formData);
            res.redirect('/me/stored/courses');
        } catch (error) {
            next(error);
        }
    }
    async delete(req, res, next) {
        try {
            await Course.delete({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }
    //[PATCH] /courses/:id/restore
    async restore(req, res, next) {
        try {
            await Course.restore({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }
    async forceDelete(req, res, next) {
        try {
            await Course.deleteOne({ _id: req.params.id });
            res.redirect('back');
        } catch (error) {
            next(error);
        }
    }
    // [POST] /courses/handle-form-actions
    async handleFormAction(req, res, next) {
        switch (req.body.action) {
            case 'delete':
                try {
                    await Course.delete({ _id: { $in: req.body.courseIds } });
                    res.redirect('back');
                } catch (error) {
                    next(error);
                }
                break;
            case 'perDelete':
                await Course.deleteMany({ _id: { $in: req.body.courseIds } });
                res.redirect('back');
                break;
            case 'restore':
                await Course.restore({ _id: { $in: req.body.courseIds } });
                res.redirect('back');
                break;
            default:
                res.json('Invalid action: ' + req.body.action);
        }
    }
}

module.exports = new CourseController();
