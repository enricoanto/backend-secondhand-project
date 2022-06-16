const express = require('express');
const router = express.Router();
const ProductRouter = require('./product');
const OrderRouter = require('./order');
const Auth = require('../../middlewares/autentication')

router.use('/product', ProductRouter)
router.use('/order', Auth.authentication, OrderRouter)

module.exports = router
