var express = require('express');
var router = express.Router();
const userRouter = require('./auth')
const sellerRouter = require('./seller')
const buyerRouter = require('./buyer')
const historyRouter = require('./history')
const notificationRouter = require('./notification')
const userrout = require('./users')
const {Order} = require('../models/')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/order-hidden', async (req, res)=> {
  try {
    const order = await Order.findAll()
    res.status(200).json(order)
  } catch (err) {
    res.status(400).json(err)
  }
})
router.use('/auth', userRouter)
router.use('/users', userrout)
router.use('/seller', sellerRouter)
router.use('/buyer', buyerRouter)
router.use('/history', historyRouter)
router.use('/notification', notificationRouter)

module.exports = router;