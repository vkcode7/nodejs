const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

//router.use() - to filter for incoming all request (post/get too)
//router.post() - only for post
//router.get() - only for GET

// admin/add-product => GET request
router.get('/add-product', (req, res, next) => {
    console.log('In add-Product GET middleware');
    //res.send('<form action="/admin/add-product" method="POST"><input type="text" name="title"></input><button type="submit">Add Product</button></form>');
    //res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html')); //path should be wrt app.js
    res.sendFile(path.join(rootDir, 'views', 'add-product.html')); //path should be wrt app.js
});

// admin/add-product => POST request
router.post('/add-product', (req, res, next) => {
    console.log('In add-product POST middleware');
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;