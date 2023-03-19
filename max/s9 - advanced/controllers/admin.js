const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('admin/add-product', {
      prods:[], 
      pageTitle: 'Add Product', 
      path: '/admin/add-product', 
      activeProducts: true,
      productsCSS: true,
      formsCSS: true
    }); 
  };

exports.postAddProduct = (req, res, next) => {
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const product = new Product(title, imageUrl, description, price);
    product.save();
    res.redirect('/');
  };

exports.getProducts = (req, res, next) => {
    console.log("get admin products");
    Product.fetchAll(products => {
        res.render('admin/products', {
            prods:products, 
            pageTitle: 'Admin', 
            path: '/admin/products'
          });
    });
  };