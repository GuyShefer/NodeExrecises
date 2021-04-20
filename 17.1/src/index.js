const express = require('express');
require('./db/mongoose');

const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products.routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/product', productsRoutes);

app.listen(port, () => {
    console.log('Server is up on port' + port);
})