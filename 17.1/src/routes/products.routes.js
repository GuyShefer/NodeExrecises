const express = require('express');
const router = express.Router();
const productController = require('../controllers/products.controller');

router.post('/', (req, res) => {
    productController.addProduct(req, res);
})

module.exports = router;