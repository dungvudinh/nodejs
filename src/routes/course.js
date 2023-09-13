const express = require('express');
const app = express();
const router = express.Router();
const courseController = require('../app/controllers/CourseController');
const upload = require('../config/uploadMiddleware');

router.post('/handle-form-actions', courseController.handleFormAction);
router.get('/create', courseController.create);
router.post('/store', courseController.store);
router.patch('/:id/restore', courseController.restore);
router.get('/:id/edit', courseController.edit);
router.delete('/:id/force', courseController.forceDelete);
router.delete('/:id', courseController.delete); 
router.put('/:id', upload.single('image_url'), courseController.update);
router.get('/:courseId', courseController.detail);
module.exports = router;
