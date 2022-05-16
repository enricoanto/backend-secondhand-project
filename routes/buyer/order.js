const express = require('express');
const router = express.Router();
const OrderController = require('../../controllers/buyer/order')
const Auth = require('../../middlewares/autentication')

router.post ('/', OrderController.addOrder)
router.get ('/', OrderController.getOrders)
router.get ('/:id', OrderController.getOrderById)
router.put ('/:id', Auth.orderAuthorization, OrderController.editOrder)
router.delete ('/:id', Auth.orderAuthorization, OrderController.deleteOrder)

module.exports = router