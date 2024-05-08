const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

const { register, login, logout } = require('../controllers/auth.controller')

router.post('/auth/register',register);
router.post('/auth/login',login);
router.post('/auth/logout',authMiddleware, logout);

module.exports = router