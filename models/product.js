const fs = require('fs');
const path = require('path');

// create a path to the json file with the data
const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

// function to retrieve products from file
const getProductsFromFile = (cb) => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      return cb([])
    }
    cb(JSON.parse(fileContent));
  })
}



// this class containing two methods, one to save a new product 
// and another to display all the products
module.exports = class Product {
  constructor(title, imageUrl, price, description) {
    this.title = title;
    this.imageUrl = imageUrl,
    this.price = price,
    this.description = description
  }

  save() {
    this.id = Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), (err) => {
        console.log(err);
      })
    });
  }

  static fetchAll(cb) {
    getProductsFromFile(cb);
  }

  static fetchOne(id, cb) {
    getProductsFromFile(products => {
      const product = products.find(p => p.id === id);
      cb(product);
    })
  }

}