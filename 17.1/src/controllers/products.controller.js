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
        res.status(400).send(err);
    }
}

const updateProductById = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["details.discount", "name", "category", "isActive"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updaes" });
    }

    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!product) {
            return res.status(404).send();
        }
        res.send(product);
    } catch (err) {
        res.status(400).send(err);
    }
}

const deleteProductById = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).send();
        }

        res.send(product)
    } catch (err) {
        res.status(500).send(err);
    }

}

const deleteAllProducts = async (req, res) => {
    try {
        await Product.deleteMany();
        res.status(200).send('All products has been deleted.');
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    addProduct,
    getAllUsers,
    getProductByName,
    getAllActiveProducts,
    getAllProductsInPriceRange,
    updateProductById,
    deleteProductById,
    deleteAllProducts,
}