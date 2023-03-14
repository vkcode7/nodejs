const path = require('path');
const express = require('express');
const router = express.Router();
const rootDir = require('../util/path');

//router.use() - to filter for incoming all request (post/get too)
//router.post() - only for post
//router.get() - only for GET

router.get('/', (req, res, next) => {
    //res.send('<h1>Hello from Express!</h1>');
    //path.join() will join them correctly for both windows / linux automatically
    //goes to folder where shop.js, then UP one level, then to views
    //res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); //path should be wrt app.js
    res.sendFile(path.join(rootDir, 'views', 'shop.html')); //path should be wrt app.js
});

module.exports = router;