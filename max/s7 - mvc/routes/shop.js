const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  //to pass data
  const products = adminData.products;

  res.render('shop', {
    prods:products, 
    docTitle: 'Shop', 
    path: '/', 
    hasProducts: products.length > 0,
    activeShop: true,
    productsCSS: true
  });

  console.log(adminData.products);
});

module.exports = router;
