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

const getAllUsers = (req, res) => {
    Product.find({}).then((products) => {
        res.status(200).send(products);
    }).catch((err) => {
        res.status(400).send(err);
    })
}

const getProductByName = (req,res) => {
    const productName = req.params.name;
    Product.findOne({name: productName}).then(product => {
        if(!product) {
            return res.status(404).send();
        }
        res.send(product);
    }).catch(err => {
        res.status(501).send(err);
    })
}

const getAllActiveProducts = (req,res) => {
    Product.find({isActive: true}).then((products) => {
        res.status(200).send(products);
    }).catch((err) => {
        res.status(400).send(err);
    })
}

const getAllProductsInPriceRange = (req,res) => {
    const minPrice = req.params.min;
    const maxPrice = req.params.max;
    // Product.find({}).where('details.price').gt(minPrice).lt(maxPrice).exec( x => {
    //     console.log(x);
    // })
    Product.find({'details.price': {$gte : minPrice, $lte : maxPrice }}).then(products => {
        if(!products) {
            return res.status(404).send();
        }
        res.send(products);
    }).catch(err => {
        res.status(501).send(err);
    })
}

module.exports = {
    addProduct,
    getAllUsers,
    getProductByName,
    getAllActiveProducts,
    getAllProductsInPriceRange,
}