const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//handlebars engine needs to be imported
//const expressHbs = require('express-handlebars');

const app = express();

//set global config value including your own key/value

//PUG
//pug and EJS are builtin engines in express JS so no need to import it
//app.set('view engine', 'pug'); //use 'pug' template engine

//Handlebars - the first arg 'handlebars' is extension, could be hbs
//app.engine('handlebars', expressHbs.engine({layoutsDir: 'views/layouts/', defaultLayout: 'main'}));
//app.set('view engine', 'handlebars'); //use 'handlebars' template engine

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
    /* plain HTML rendering */
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html')); //html rendering

    /* engine rendering*/
    res.render('404', {docTitle: '404 error', path: '/'}); //extension is optional as view engine knows that
});

app.listen(3000);
