'use strit'
const { Order, Product, User, Notification } = require('../../models')

class OrderController {
    static async addOrder(req, res, next) {
        try {
            const buyer_id = req.userData.id
            const registrationToken = req.headers.reg_token
            const { bid_price, product_id } = req.body
            const product = await Product.findOne({
                where: {
                    id: product_id
                },
                include: ['User']
            })
            const buyer = await User.findByPk(buyer_id)
            if (product.user_id == buyer_id) {
                res.status(400).json({ name: "Bad Request", msg: "You cannot buy your own product" })
            } else {
                const orderExist = await Order.findOne({
                    where: {
                        product_id,
                        buyer_id
                    }
                })
                if (orderExist) {
                    res.status(400).json({ name: "bad Request", msg: "you has order for this product" })
                } else {
                    const order = await Order.create({ buyer_id, product_id, price: bid_price })
                    await Notification.create({ product_id, bid_price, transaction_date: new Date(), status: "bid", seller_name: product.User.full_name, buyer_name: buyer.full_name, receiver_id: buyer_id })
                    await Notification.create({ product_id, bid_price, transaction_date: new Date(), status: "bid", seller_name: product.User.full_name, buyer_name: buyer.full_name, receiver_id: product.user_id })
                    if (registrationToken) {
                        var option = {
                            priority: "high",
                            timeToLive: 60*60*24
                        }
                        var payload = {
                            data: { product_id, bid_price, transaction_date: new Date(), status: "bid", seller_name: product.User.full_name, buyer_name: buyer.full_name, receiver_id: buyer_id }
                        }
                        await adminNotif.messaging().sendToDevice(registrationToken, payload, option)
                    }
                    res.status(201).json(order)
                }
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async getOrders(req, res, next) {
        const user_id = req.userData.id
        try {
            const orders = await Order.findAll({
                where: {
                    buyer_id: user_id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Product, attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                }, {
                    model: User,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'password', 'image_url']
                    }
                }]
            })
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json(err)
        }

    }
    static async getOrderById(req, res, next) {
        const user_id = req.userData.id
        const id = req.params.id
        try {
            const order = await Order.findOne({
                where: {
                    buyer_id: user_id,
                    id
                },
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                include: [{
                    model: Product, attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                }, {
                    model: User,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'password', 'image_url']
                    }
                }]
            })
            res.status(200).json(order)
        } catch (err) {
            res.status(500).json(err)
        }

    }
    static async editOrder(req, res, nex) {
        try {
            const buyer_id = req.userData.id
            const id = req.params.id
            const { price, product_id } = req.body
            const product = await Product.findOne({
                where: {
                    id: product_id,
                    user_id: buyer_id
                }
            })
            if (product) {
                res.status(400).json({ name: "Bad Request", msg: "You cannot buy your own product" })
            } else {
                const orderExist = await Order.findOne({
                    where: {
                        product_id,
                        buyer_id
                    }
                })
                if (orderExist) {
                    res.status(400).json({ name: "bad Request", msg: "you has order for this product" })
                } else {
                    const order = await Order.update({
                        buyer_id,
                        product_id,
                        price
                    }, {
                        where: {
                            id
                        },
                        returning: true
                    })
                    res.status(201).json(order)
                }
            }

        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async deleteOrder(req, res, nex) {
        try {

        } catch (err) {
            res.status(500).json(err)
        }
    }
}
module.exports = OrderController