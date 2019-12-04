const express = require('express');
const shopController = require('../controllers/products');


const router = express.Router();

router.get('/', shopController.indexPage);
router.get('/products', shopController.getProducts);
router.get('/cart', shopController.cartPage);
router.get('/checkout', shopController.checkoutPage)

module.exports = router;     