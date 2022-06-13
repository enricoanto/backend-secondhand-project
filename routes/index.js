var express = require('express');
var router = express.Router();
const userRouter = require('./auth')
const sellerRouter = require('./seller')
const buyerRouter = require('./buyer')
const historyRouter = require('./history')
const notificationRouter = require('./notification')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use('/auth', userRouter)
router.use('/seller', sellerRouter)
router.use('/buyer', buyerRouter)
router.use('/history', historyRouter)
router.use('/notification', notificationRouter)

module.exports = router;