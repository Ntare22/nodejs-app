const Product = require('../models/product');
const Cart = require('../models/cart')


exports.indexPage = (req, res, next) => {
  res.render('shop/index', {
    path: '/',
    pageTitle: 'Welcome to Online Store',
  })
}

exports.cartPage = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = []
      for (product of products) {
        const cartProductData = cart.products.find(prod => prod.id === product.id);
        if (cartProductData) {
          cartProducts.push({productData: product, qty: cartProductData.qty});
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Cart',
        products: cartProducts
      });
    });
  });
  
}

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchOne(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  })
  res.redirect('/cart');
}

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.fetchOne(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/cart');    
  })
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