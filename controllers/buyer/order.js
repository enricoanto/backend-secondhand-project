'use strit'
const { Order, Product, User, Notification } = require('../../models')
const { Op } = require("sequelize");

class OrderController {
    static async addOrder(req, res, next) {
        try {
            const buyer_id = req.userData.id
            const { bid_price, product_id } = req.body
            const product = await Product.findOne({
                where: {
                    id: product_id
                },
                include: ['User', 'Orders']
            })
            if (!product) {
                next({ name: "productNotFound" })
            }
            const buyer = await User.findByPk(buyer_id)
            if (product.user_id == buyer_id) {
                next({ name: "forBiddenBuy" })
            } else if (product.Orders.length == 4) {
                next({ name: 'maxOrders' })
            } else {
                const orderExist = await Order.findOne({
                    where: {
                        product_id,
                        buyer_id
                    }
                })
                if (orderExist) {
                    next({ name: "redundantOrder" })
                } else {
                    const order = await Order.create({
                        buyer_id,
                        product_id,
                        price: bid_price,
                        product_name: product.name,
                        base_price: product.base_price,
                        product_image: product.image_url,
                    })
                    await Notification.create({
                        product_id, bid_price,
                        bid_price,
                        transaction_date: new Date(),
                        status: "bid",
                        seller_name: product.User.full_name,
                        buyer_name: buyer.full_name,
                        receiver_id: product.user_id,
                        image_url: product.image_url,
                        product_name: product.name,
                        base_price: product.base_price,
                        order_id: order.id,
                        notification_type: 'seller'
                    })
                    res.status(201).json(order)
                }
            }
        } catch (err) {
            next(err)
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
                    }, include: [{
                        model: User,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'password', 'image_url']
                        }
                    }]
                }, {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'image_url']
                    }
                }]
            })
            res.status(200).json(orders)
        } catch (err) {
            next(err)
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
                        exclude: ['id', 'createdAt', 'updatedAt'],
                    }, include: [{
                        model: User,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'password', 'image_url']
                        }
                    }]
                }, {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'image_url']
                    }
                }]
            })
            res.status(200).json(order)
        } catch (err) {
            next(err)
        }

    }
    static async editOrder(req, res, next) {
        try {
            const buyer_id = req.userData.id
            const id = req.params.id
            const { bid_price } = req.body

            const product = await Product.findOne({
                where: {
                    id: product_id
                },
                include: ['User', 'Orders']
            })

            const order = await Order.update({
                buyer_id,
                price: bid_price,
                status: 'pending'
            }, {
                where: {
                    id,
                    status: {
                        [Op.or]: ['pending', 'declined']
                    }
                },
                returning: true
            })

            await Notification.create({
                product_id, bid_price,
                bid_price,
                transaction_date: new Date(),
                status: "bid",
                seller_name: product.User.full_name,
                buyer_name: buyer.full_name,
                receiver_id: product.user_id,
                image_url: product.image_url,
                product_name: product.name,
                base_price: product.base_price,
                order_id: order.id,
                notification_type: 'seller'
            })
            res.status(200).json(order[1][0])

        } catch (err) {
            next(err)
        }
    }
    static async deleteOrder(req, res, next) {
        try {
            const id = req.params.id
            await Order.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({ name: "success", message: "Order has been deleted." })
        } catch (err) {
            next(err)
        }
    }
}
module.exports = OrderController