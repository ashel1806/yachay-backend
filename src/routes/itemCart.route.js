const router = require('express').Router();
const { ItemCartController } = require('../controllers');

router.route('/').post(ItemCartController.createItemCart);
router.route('/:idItemCart').delete(ItemCartController.deleteItemCart);

module.exports = router;
