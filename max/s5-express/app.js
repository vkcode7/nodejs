//spin a web server
//core modules - http, https, fs, path, os
//http - launch a server, send requests
//https - launch a SSL server

//var, let, const
//for header docs look at https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers

/*
Node JS runs on a main thread (single javascript thread) but internally it uses 2 thread pools - 
one for event loop (timers, polls, I/O callbacks) and another for worker threads (file I/O etc)

createServer() event never ends
*/

const http = require('http'); //global module so no path needed
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop')
const rootDir = require('./util/path');

//express uses idea of middleware
//app.use() is a middleware function
//next is a function that will be passed to next middleware function

app.use(bodyParser.urlencoded({extended : false}));

//serving pages STATICALLY
//if we want to serve CSS stored in public/css folder then we have to allow read to that folder 'public'
//by using the code below, after that nodejs will allow access to css/main.css or anything under folder public.
//multiple paths can be added by copying the line and changing the folder name
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', adminRoutes);
//app.use(adminRoutes);
app.use(shopRoutes);

//catch all route
app.use((req, res) => {
    //res.status(404).send('<h1>No router registered. Page not found</h1>')
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).sendFile(path.join(rootDir, 'views', '404.html'));
});

/*
//these 2 are moved to router/admin.js
app.use('/add-product', (req, res, next) => {
    console.log('In Add-Product middleware');
    res.send('<form action="/product" method="POST"><input type="text" name="title"></input><button type="submit">Add Product</button></form>');
});


//app.use() - to filter for incoming all request (post/get too)
//app.post() - only for post
//app.get() - only for GET

app.post('/product', (req, res, next) => {
    console.log('In product middleware');
    console.log(req.body);
    res.redirect('/');
});


//This below should be the last - moved to shop.js
app.use('/', (req, res, next) => {
    console.log('In another middleware');
    res.send('<h1>Hello from Express!</h1>');
});
*/

/*
const server = http.createServer(app);
server.listen(3000); //port no 3000
*/

//above 2 lines can be replaced with
app.listen(3000);