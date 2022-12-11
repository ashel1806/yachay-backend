const router = require('express').Router();

const { StudentsCoursesController } = require('../controllers');
const { userTokenExtractor } = require('../middlewares');

router.route('/').get(StudentsCoursesController.getStudentCourses);
router
  .route('/:idStudentCourse')
  .get(StudentsCoursesController.getStudentCourseById);
router
  .route('/:idCourse')
  .post(userTokenExtractor, StudentsCoursesController.enrollInCourse);

module.exports = router;
