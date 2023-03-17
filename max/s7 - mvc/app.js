const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//set global config value including your own key/value

//EJS: The favorite and another in built engine
//EJS doesnt support layouts but similar effect can be obtained using includes
app.set('view engine', 'ejs'); //use 'ejs' template engine

app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    /* engine rendering*/
    res.render('404', {docTitle: '404 error', path: '/'}); //extension is optional as view engine knows that
});

app.listen(3000);
