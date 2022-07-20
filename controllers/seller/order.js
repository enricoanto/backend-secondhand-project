'use strict'
const { Order, Product, User, History, Notification } = require('../../models')

class OrderController {
    static async getMyOrders(req, res, next) {
        try {
            const user_id = req.userData.id
            const status = req.query.status
            let filter
            if (status) {
                filter = {
                    '$Product.user_id$': user_id,
                    status
                }
            } else {
                filter = {
                    '$Product.user_id$': user_id,
                }
            }
            const orders = await Order.findAll({
                include: [{
                    model: Product,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt'],
                    },
                    include: [{
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
                }],
                where: filter
            })
            res.status(200).json(orders)
        } catch (err) {
            next(err)
        }
    }
    static async getOrdersByProduct(req, res, next) {
        try {
            const product_id = req.params.product_id
            const orders = await Order.findAll({
                include: [{
                    model: Product, attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt'],
                        include: [{
                            model: User,
                            attributes: {
                                exclude: ['createdAt', 'updatedAt', 'password', 'image_url']
                            }
                        }]
                    }
                }, {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password', 'image_url']
                    }
                }],
                where: {
                    product_id
                }
            })
            res.status(200).json(orders)
        } catch (err) {
            next(err)
        }
    }
    static async getOrderById(req, res, next) {
        try {
            const id = req.params.id
            const order = await Order.findOne({
                include: [{
                    model: Product, attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }, include: [{
                        model: User,
                        attributes: {
                            exclude: ['createdAt', 'updatedAt', 'password']
                        }
                    }]
                }, {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
                    }
                }],
                where: {
                    id
                }
            })
            res.status(200).json(order)

        } catch (err) {
            next(err)
        }
    }
    static async editOrder(req, res, next) {
        try {
            const { status } = req.body
            const id = req.params.id
            const order = await Order.update({
                status,
                transaction_date: new Date()
            }, {
                where: {
                    id
                },
                include: ['User'],
                returning: true
            })
            const buyer = await User.findByPk(order[1][0].buyer_id)
            const product = await Product.findOne({ where: { id: order[1][0].product_id }, include: ['User'] })

            if (status == 'accepted') {
                await Product.update({ status: 'sold' }, {
                    where: {
                        id: product.id
                    }
                })
            } else {
                await Product.update({ status: 'available' }, {
                    where: {
                        id: product.id
                    }
                })
            }
            await Notification.create({
                product_id: product.id,
                bid_price: order[1][0].price,
                transaction_date: new Date(),
                status,
                seller_name: product.User.full_name,
                buyer_name: buyer.full_name,
                receiver_id: buyer.id,
                image_url: product.image_url,
                product_name: product.name,
                base_price: product.base_price,
                notification_type: 'buyer'
            })
            await History.create({
                product_name: product.name,
                price: order[1][0].price,
                transaction_date: new Date(),
                status: status,
                user_id: buyer.id,
                image_url: product.image_url,
                product_id: product.id
            })
           
            res.status(200).json(order[1][0])
        } catch (err) {
            next(err)
        }
    }
}

module.exports = OrderController