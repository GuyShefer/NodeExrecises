const Product = require('../models/product.model');

const addProduct = (req, res) => {
    const extractProduct = {} = req.body;
    console.log(req.body);
    // validations // 

    const product = new Product(extractProduct);

    product.save().then(() => {
        res.status(201).send(product);
    }).catch((err) => {
        res.status(400).send(err);
    });

}

module.exports = {
    addProduct,
}