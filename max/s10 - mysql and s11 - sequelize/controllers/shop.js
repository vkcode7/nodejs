const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(rows => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/products'
      });
    })
    .catch(err => console.log(err));

    /* s10 - mysql way
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/product-list', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/products'
      });
    })
    .catch(err => console.log(err));
    */
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  /*
  Product.findAll({where: { //<-- findALl is a sequelize method
    id: prodId
  }})
  .then((products) => {
    console.log(products);
    res.render('shop/product-detail', {
      product: products[0],
      pageTitle: products[0].title,
      path: '/products'
    });
  })
  .catch(err => console.log(err));
  */
  
  Product.findByPk(prodId) //findByPk is a sequelize function
  .then((product) => {
    console.log(product);
    res.render('shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => console.log(err));
  
/*
//s10 - my SQL way
  Product.findById(prodId)
  .then(([product]) => {
    console.log(product);
    res.render('shop/product-detail', {
      product: product[0],
      pageTitle: product.title,
      path: '/products'
    });
  })
  .catch(err => console.log(err));
  */
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(rows => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));

    /*
    //s10 
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      res.render('shop/index', {
        prods: rows,
        pageTitle: 'Shop',
        path: '/'
      });
    })
    .catch(err => console.log(err));
    */
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
