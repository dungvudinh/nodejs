const express = require('express');
const app = express();
const router = express.Router();
const SiteController = require('../app/controllers/SiteController');

router.use('/upload', SiteController.upload);
router.use('/login', SiteController.login);
router.use('/', SiteController.home);

module.exports = router;
