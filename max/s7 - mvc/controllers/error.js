exports.get404 = (req, res, next) => {
    /* engine rendering*/
    res.render('404', {docTitle: '404 error', path: '/'}); //extension is optional as view engine knows that
};