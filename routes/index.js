const express = require('express');
const router = express.Router();
const userRouter = require('./auth')
const sellerRouter = require('./seller')
const buyerRouter = require('./buyer')
const notificationRouter = require('./notification')
const CategoryRouter = require('./category')
const BannerRouter = require('./banner')


router.use('/auth', userRouter)
router.use('/seller', sellerRouter)
router.use('/buyer', buyerRouter)
router.use('/notification', notificationRouter)
router.use('/banner', BannerRouter)
router.use('/category', CategoryRouter)

module.exports = router;