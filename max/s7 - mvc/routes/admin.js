const path = require('path');

const express = require('express');
const productsController = require('../controllers/products');

const router = express.Router();

// /admin/add-product => GET
// tell express router that it should use the getAddProduct()
// when a request is routed
router.get('/add-product', productsController.getAddProduct);

/*
The above code in s6 could be considered as controller logic but eventually
it can grow up quickly into a mess so it is better to separate routes
and controllers in separate files

From here though product route is in both admin and shop.js routes,
all products related logic can be clubbed in a single controoler
say products.js
*/


// /admin/add-product => POST
router.post('/add-product', productsController.postAddProduct);

module.exports = router;

