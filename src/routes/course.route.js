const router = require('express').Router();
const { CourseController } = require('../controllers');

router.route('/').get(CourseController.findAllCourses);
router.route('/:idCourse').get(CourseController.findCourseById);
router.route('/').post(CourseController.createCourse);
router.route('/details').post(CourseController.createCourseDetails);

module.exports = router;
