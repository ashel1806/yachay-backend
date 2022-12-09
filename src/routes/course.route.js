const router = require('express').Router();
const { CourseController } = require('../controllers');

router.route('/').get(CourseController.findAllCourses);
router.route('/:idCourse').get(CourseController.findCourseById);
router.route('/').post(CourseController.createCourse);
router.route('/details').post(CourseController.createCourseDetails);
router.route('/:idCourse').put(CourseController.updateCourse);
router.route('/details/:idCourse').put(CourseController.updateCourseDetails);


module.exports = router;
