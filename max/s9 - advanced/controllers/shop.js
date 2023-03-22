const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/product-list', {
            prods:products, 
            pageTitle: 'All Products', 
            path: '/', 
            hasProducts: products.length > 0,
            activeShop: true,
            productsCSS: true
          });
    });
  };
  
exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId; //in the shop route we specifid :productId as name
  Product.findById(prodId, product => {
      res.render('shop/product-detail', {product: product, pageTitle: "Product Details", path: "/products"});  
    });
  };

exports.getIndex = (req, res, next) => {
    Product.fetchAll(products => {
        res.render('shop/index', {
            prods:products, 
            pageTitle: 'Shop', 
            path: '/'
          });
    });
  };

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
      pageTitle: 'Your Cart', 
        path: '/cart'
      });
  };

exports.postCart = (req, res, next) => {
    console.log('in post cart');
    const prodId = req.body.productId; //in the shop route we specifid :productId as name
    Product.findById(prodId, (product) => {
      Cart.addProduct(prodId, product.price);
    });
    console.log(prodId);
    res.redirect('cart');
  };

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
      pageTitle: 'Your Orders', 
        path: '/orders'
      });
  };

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
      pageTitle: 'Checkout', 
      path: '/checkout'
    });
  };

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for(product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if(cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        pageTitle: 'Your Cart', 
        path: '/cart',
        products: cartProducts
      });
    });
  });
};