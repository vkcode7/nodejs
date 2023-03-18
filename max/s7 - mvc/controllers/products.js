const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      prods:[], 
      docTitle: 'Add Product', 
      path: '/admin/add-product', 
      activeProducts: true,
      productsCSS: true,
      formsCSS: true
    }); 
  };

exports.postAddProduct = (req, res, next) => {
    //console.log(req.body);
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/');
  };

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop', {
            prods:products, 
            docTitle: 'Shop', 
            path: '/', 
            hasProducts: products.length > 0,
            activeShop: true,
            productsCSS: true
          });
    });
  };