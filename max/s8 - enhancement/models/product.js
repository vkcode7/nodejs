const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, description, price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
};