const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Product = sequelize.define('product', {
  id : { //<-- data fields details for sequelize to create
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title : { //<-- data fields details for sequelize to create
    type: Sequelize.STRING,
    allowNull: false
  },
  price : { //<-- data fields details for sequelize to create
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  imageUrl : { //<-- data fields details for sequelize to create
    type: Sequelize.STRING,
    allowNull: false
  },
  description : { //<-- data fields details for sequelize to create
    type: Sequelize.STRING,
    allowNull: false
  }
});

module.exports = Product;

/*
class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
*/

/*
//needed for s10 
const fs = require('fs');
const path = require('path');
const db = require('../util/database');

const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
      cb(JSON.parse(fileContent));
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
    //returns a promise
    return db.execute(
      'INSERT into products (title, price, imageUrl, description) VALUES(?,?,?,?)',
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
      });
    });
  }

  static fetchAll() {
    //returns a promise
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products where products.id = ?', [id]);
  }
};
*/
