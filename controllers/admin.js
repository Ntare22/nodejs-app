const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  })
};

exports.getAdminProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      prods: products,
      path: '/admin/products',
      pageTitle: 'Admin Products'
    });
  });
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  Product.fetchOne(prodId, product => {
    if (!product) {
      return res.redirect('/');
    }
    res.render('admin/edit-product', {
      pageTitle: 'Edit Product',
      path: '/admin/edit-product',
      editing: editMode,
      product: product
    })
  })
};

exports.postEditProduct = (req, res, next) => {
  const editedProdId = req.params.productId;
  Product.fetchOne(editedProdId, product => {
    if (product) {
      product.title = req.body.title;
      product.imageUrl = req.body.imageUrl;
      product.price = req.body.price;
      product.description = req.body.description;
    } else {
      return res.redirect('/not-found')
    }
  })
}

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  const product = new Product(title, imageUrl, price, description);
  product.save();
  res.redirect('/products');
};