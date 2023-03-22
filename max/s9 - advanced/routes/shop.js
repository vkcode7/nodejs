const path = require('path');

const express = require('express');
const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);
//more specific route should be added first

//tell the router we can have productid in the URL
//will be accessed by name productId /products/1234
router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getCart); //GET
router.post('/cart', shopController.postCart); //POST used from product-detail.ejs

router.get('/orders', shopController.getOrders);
router.get('/checkout', shopController.getCheckout);

module.exports = router;
