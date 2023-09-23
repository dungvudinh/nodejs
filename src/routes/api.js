const express = require('express');
const app = express();
const router = express.Router();
const APIController = require('../app/controllers/APIController');


router.get('/video', APIController.getCapVideo);
router.get('/user', APIController.getAllUser);
module.exports = router;