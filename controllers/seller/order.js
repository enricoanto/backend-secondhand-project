'use strict'
const { Order, Product, User, Notification } = require('../../models')

class OrderController {
    static async getMyOrders(req, res, next) {
        try {
            const user_id = req.userData.id
            const status = req.query.status
            let filter = {
                '$Product.user_id$': user_id
            }
            if (status) {
               filter.status = status
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
                            exclude: ['createdAt', 'updatedAt', 'password']
                        }
                    }]
                }, {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
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
                    model: Product,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt'],
                    },
                    include: [{
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
                        exclude: ['id', 'createdAt', 'updatedAt'],
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

            if (status == 'accepted') {
                await Product.update({ status: 'sold' }, {
                    where: {
                        id: order[1][0].product_id
                    }
                })
            } else {
                await Product.update({ status: 'available' }, {
                    where: {
                        id: order[1][0].product_id
                    }
                })
            }
            await Notification.create({
                product_id: order[1][0].product_id,
                transaction_date: new Date(),
                status,
                receiver_id: order[1][0].buyer_id,
                order_id: order[1][0].id
            })
           
            res.status(200).json(order[1][0])
        } catch (err) {
            next(err)
        }
    }
}

module.exports = OrderController