const Product = require('../models/product');


exports.indexPage = (req, res, next) => {
  res.render('shop/index', {
    path: '/',
    pageTitle: 'Welcome to Online Store',
  })
}

exports.cartPage = (req, res, next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'Cart'
  })
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      prods: products,
      path: '/products',
      pageTitle: 'Shop'
    }); 
  });
}

exports.checkoutPage = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}