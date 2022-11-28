const router = require('express').Router();
const { CourseController } = require('../controllers');

router.route('/').get(CourseController.findCourses);

module.exports = router;
