const router = require('express').Router();
const { CartController } = require('../controllers');
const { userTokenExtractor } = require('../middlewares');

router.route('/').post(userTokenExtractor, CartController.createCart);
router.route('/:idCart').put(CartController.updateCart);
router.route('/:idCart/items').get(CartController.getItemsCart);

module.exports = router;
