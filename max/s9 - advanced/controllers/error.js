exports.get404 = (req, res, next) => {
    /* engine rendering*/
    res.render('404', {pageTitle: '404 error', path: '/404'}); //extension is optional as view engine knows that
};