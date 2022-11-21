const router = require('express').Router();
const { userController } = require('../controllers');
const { userTokenExtractor } = require('../middlewares');

router.route('/details').get(userController.getUserDetails);
router.route('/roles').get(userController.getUserRoles);
router.route('/me').get(userTokenExtractor, userController.me);
router
  .route('/me/:idUser')
  .put(userTokenExtractor, userController.postUserDetails);

module.exports = router;
