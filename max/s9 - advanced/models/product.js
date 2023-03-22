const fs = require('fs');
const path = require('path');
const cart = require('./cart');

const p = path.join(path.dirname(process.mainModule.filename), 
    'data', 
    'products.json'
    );

const getProductsFromFile = (callback) => {
    //the below is async so needs to be made sync or it will fail
    //so callback is needed
    fs.readFile(p, (err, fileContents) => {
        if(err) {
            callback([]);
        }
        else {
            callback(JSON.parse(fileContents));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {

        getProductsFromFile(products => {
            if(this.id) {
                const existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
            
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    if(err)
                        console.log(err);
                });
            }
        });
    }

    static deleteById(id) {
        getProductsFromFile(products => {
            const product = products.find(prod => prod.id === id);
            console.log(product);
            const updateProducts = products.filter(prod => prod.id !== id);

            fs.writeFile(p, JSON.stringify(updateProducts), (err) => {
                if(!err) {
                    cart.deleteProduct(id, product.price);
                } else {
                    console.log(err);
                }
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }

    static findById(id, cb) {
        getProductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }
};