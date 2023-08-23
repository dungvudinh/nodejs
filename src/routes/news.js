const express = require('express');
const app = express();
const router = express.Router();
const NewsController = require('../app/controllers/NewsController');

router.use('/', NewsController.index);
module.exports = router;
