const path = require('path');

const express = require('express');
const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
// tell express router that it should use the getAddProduct()
// when a request is routed
router.get('/add-product', adminController.getAddProduct);

/*
The above code in s6 could be considered as controller logic but eventually
it can grow up quickly into a mess so it is better to separate routes
and controllers in separate files

From here though product route is in both admin and shop.js routes,
all products related logic can be clubbed in a single controoler
say products.js
*/


// /admin/add-product => POST
router.post('/add-product', adminController.postAddProduct);

// /admin/products => GET
router.use('/products', adminController.getProducts);

router.get('/edit-product/:productId', adminController.getEditProduct);
router.post('/edit-product', adminController.postEditProduct);
router.post('/delete-product', adminController.postDeleteProduct);


module.exports = router;

