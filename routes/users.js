var express = require('express');
var router = express.Router();
const { Product, Order, Notification, User } = require('../models/');
const { Op } = require("sequelize");

/* GET users listing. */
router.get('/', async function (req, res, next) {
  try {
    const notifications = await Notification.findAll({ where: { status: 'declined', order_id: null } })
    Promise.all(
      notifications.map(async el => {
        const order = await Order.findOne({
          where: {
            product_id: el.product_id,
            buyer_id: el.receiver_id
          }
        })
        if (order) {
          const notif = await Notification.update( {
            order_id: order.id
          },{
            where: {
              id: el.id
            }
          })
          console.log(notif)
        }
      })
    )
res.status(200).json("suucess")
  } catch (err) {
  res.status(500).json(err)
}
});

router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.findAll({ include: [{ model: Product }] })
    res.status(200).json(orders)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/notifications', async (req, res) => {
  try {
    const notifs = await Notification.findAll({ where: { status: 'declined' } })
    res.status(200).json(notifs)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;
