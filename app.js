const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')



const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const notFoundPage = require('./controllers/not-found');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(notFoundPage.notFound);


app.listen(3000);
