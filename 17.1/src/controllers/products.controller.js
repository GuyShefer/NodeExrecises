const Product = require('../models/product.model');

const addProduct = async (req, res) => {
    const extractProduct = {} = req.body;

    // validations // 

    try {
        const product = new Product(extractProduct);
        product.save();
        res.status(201).send(product);
    } catch (err) {
        res.status(400).send(err);
    }
}

const getAllUsers = async (req, res) => {

    try {
        const products = await Product.find({});
        res.status(200).send(products);
    } catch (err) {
        res.status(400).send(err);
    }
}

const getProductByName = async (req, res) => {
    const productName = req.params.name;

    try {
        const product = await Product.findOne({ name: productName });
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (err) {
        res.status(501).send(err);
    }
}

const getAllActiveProducts = async (req, res) => {

    try {
        const products = await Product.find({ isActive: true });
        res.status(200).send(products);
    } catch (err) {
        res.status(400).send(err);
    }
}

const getAllProductsInPriceRange = async (req, res) => {
    const minPrice = req.params.min;
    const maxPrice = req.params.max;

    try {
        const products = await Product.find({ 'details.price': { $gte: minPrice, $lte: maxPrice } });
        if (!products) {
            return res.status(404).send();
        }
        res.send(products);
    } catch (err) {
        res.status(501).send(err);
    }
}

module.exports = {
    addProduct,
    getAllUsers,
    getProductByName,
    getAllActiveProducts,
    getAllProductsInPriceRange,
}