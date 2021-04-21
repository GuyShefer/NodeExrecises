const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');

router.post('/', (req, res) => {
    productController.addProduct(req, res);
})

router.get('/', (req, res) => {
    productController.getAllUsers(req, res);
})

router.get('/byName/:name', (req, res) => {
    productController.getProductByName(req, res);
})

router.get('/byActivity', (req, res) => {
    productController.getAllActiveProducts(req, res);
})

router.get('/byPriceRange/:min/:max', (req, res) => {
    productController.getAllProductsInPriceRange(req, res);
})

router.patch('/byId/:id', (req, res) => {
    productController.updateProductById(req, res);
})

router.delete('/byId/:id', (req, res) => {
    productController.deleteProductById(req, res);
})

router.delete('/', (req, res) => {
    productController.deleteAllProducts(req, res);
})

module.exports = router;