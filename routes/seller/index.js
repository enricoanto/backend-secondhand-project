const express = require('express');
const router = express.Router();
const ProductRouter = require('./product');
const OrderRouter = require('./order');
const CategoryRouter = require('./category')
const BannerRouter = require('./banner')
const Auth = require('../../middlewares/autentication')

router.use('/product', Auth.authentication, ProductRouter)
router.use('/order', Auth.authentication, OrderRouter)
router.use('/banner', BannerRouter)
router.use('/category', CategoryRouter)

module.exports = router
