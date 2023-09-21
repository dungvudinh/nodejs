const express = require('express');
const app = express();
const router = express.Router();
const SiteController = require('../app/controllers/SiteController');

// router.post('/signup', SiteController.signup);
// router.get('/signup', SiteController.signupView);
// router.post('/login', SiteController.login);
// router.get('/logout', SiteController.logout);
// router.get('/login', SiteController.loginView);
// router.use('/upload', SiteController.upload);
// router.use('/login', SiteController.login);
router.get('/', SiteController.home);

module.exports = router;
