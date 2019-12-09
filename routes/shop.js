const express = require('express');
const shopController = require('../controllers/products');


const router = express.Router();

router.get('/', shopController.indexPage);
router.get('/products', shopController.getProducts);
router.get('/products/:productId', shopController.getProduct);
router.get('/cart', shopController.cartPage);
router.post('/cart', shopController.postCart);
router.post('/cart-delete-item', shopController.postCartDeleteProduct);
router.get('/orders', shopController.ordersPage);
router.get('/checkout', shopController.checkoutPage)

module.exports = router;     