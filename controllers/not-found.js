exports.notFound = (req, res, next) => {
  res.status(404).render('not-found', { pageTitle: '404: Page Not Found', path: '/not-found' });
}