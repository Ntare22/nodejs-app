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
  constructor(t) {
    this.title = t;
  }

  save() {
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

}