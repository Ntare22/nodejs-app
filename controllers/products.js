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

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  console.log(prodId);
}

exports.ordersPage = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Orders'
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

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.fetchOne(prodId, product => {
    res.render('shop/product-detail', { 
      pageTitle: product.title, 
      product: product,
      path: '/products' })
  })
}

exports.checkoutPage = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  })
}