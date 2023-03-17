const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const adminData = require('./admin');

const router = express.Router();

router.get('/', (req, res, next) => {
  //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
  //use pug file instead shop.html
  //res.render('shop'); //pug is default templating engine so .pug is not needed
  
  //to pass data
  const products = adminData.products;
  //res.render('shop', {prods:products, docTitle: 'Shop', path: '/'}); //pug
  res.render('shop', {
    prods:products, 
    docTitle: 'Shop', 
    path: '/', 
    hasProducts: products.length > 0,
    activeShop: true,
    productsCSS: true
  }); //handlebars

  console.log(adminData.products);
});

module.exports = router;
