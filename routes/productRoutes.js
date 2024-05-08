const express = require('express');
const router = express.Router();

const { getAllProducts, getSingleProduct, getProductFilters } = require('../controllers/product.controller')

router.get('/products/filters', getProductFilters)
router.get('/products',getAllProducts);
router.get('/products/:productId',getSingleProduct);

module.exports = router