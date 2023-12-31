const newsRouter = require('./news');
const siteRouter = require('./site');
const courseRouter = require('./course');
const meRouter = require('./me');
const apiRouter = require('./api');
const { requireAuth, checkUser } = require('../app/middlewares/authMiddleware');

function route(app) {
    app.get('*', checkUser);
    app.use('/api', apiRouter);
    app.use('/me', requireAuth, meRouter);
    app.use('/news', newsRouter);
    app.use('/courses', requireAuth, courseRouter);
    app.use('/', siteRouter);
}
module.exports = route;
