const fs = require('fs');
const path = require('path');

const p = path.join(path.dirname(process.mainModule.filename), 
    'data', 
    'cart.json'
    );

module.exports = class Cart {

    static addProduct(id, productPrice) {
        //fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products: [], totalPrice: 0};
            if(!err)
                cart = JSON.parse(fileContent);

            //analyze if already product is there
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //add new product or increase the qty
            if(existingProduct) {
                updatedProduct = { ...existingProduct }; //spread op
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products]; //copy the array
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = {id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct]; //copy the array
            }

            cart.totalPrice = cart.totalPrice + +productPrice; //+ sign converts string to number
            fs.writeFile(p, JSON.stringify(cart), err => {
                if(err)
                    console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if(err) {
                return;
            }

            const updateCart = { ...JSON.parse(fileContent) };
            const product = updateCart.products.find(prod => prod.id === id);
            if(!product)
                return;

            const prodQty = product.qty;
            updateCart.totalPrice = updateCart.totalPrice - productPrice * prodQty;
            updateCart.products = updateCart.products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updateCart), err => {
                if(err)
                    console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            const cart = JSON.parse(fileContent);
            if(err) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
};