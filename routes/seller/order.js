const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/seller/order')
const Auth = require('../../middlewares/autentication')

router.get ('/', OrderController.getMyOrders)
router.get ('/product/:product_id', OrderController.getOrdersByProduct)
router.get ('/:id', Auth.authorization, OrderController.getOrderById)
router.patch ('/:id', Auth.confirmAuthorization, OrderController.editOrder)

module.exports = router