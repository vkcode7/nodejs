const path = require('path');

const express = require('express');

const rootDir = require('../util/path');
const exp = require('constants');

const router = express.Router();

const products = [];

// /admin/add-product => GET
router.get('/add-product', (req, res, next) => {
  //res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
  //res.render('add-product', {docTitle: 'Add Product', path: '/admin/add-product'}); //.pug is optional as pug is regd as view engine
  res.render('add-product', {
    prods:products, 
    docTitle: 'Add Product', 
    path: '/admin/add-product', 
    activeProducts: true,
    productsCSS: true,
    formsCSS: true
  }); //handlebars
});

// /admin/add-product => POST
router.post('/add-product', (req, res, next) => {
  //console.log(req.body);
  products.push({title: req.body.title});
  res.redirect('/');
});

//module.exports = router;
exports.routes = router;
exports.products = products;
