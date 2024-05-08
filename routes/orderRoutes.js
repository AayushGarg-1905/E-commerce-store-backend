const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { createOrder, getAllOrders } = require('../controllers/order.controller')

router.post('/create-order',authMiddleware, createOrder);
router.get('/orders',authMiddleware, getAllOrders);

module.exports = router;