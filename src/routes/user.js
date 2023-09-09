const express = require('express');
const app = express();
const router = express.Router();    
const userController  = require('../app/controllers/UserController');

router.post('/signup', userController.signup);
router.get('/signup', userController.signupView);
router.post('/login', userController.login);
router.get('/login', userController.loginView);
router.get('/', userController.index);
module.exports  = router;