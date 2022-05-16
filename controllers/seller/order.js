'use strict'
const { Order, Product, User, History, Notification } = require('../../models')

class OrderController {
    static async getMyOrders(req, res, next) {
        try {
            const user_id = req.userData.id
            const orders = await Order.findAll({
                include: [{
                    model: Product, attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                }, {
                    model: User,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'password', 'image_url']
                    }
                }], 
                    where: {
                        '$Product.user_id$': user_id
                    }
            })
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async getOrdersByProduct(req, res, next) {
        try {
            const product_id = req.params.product_id
            const orders = await Order.findAll({
                include: [{
                    model: Product, attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                }, {
                    model: User,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'password', 'image_url']
                    }
                }], 
                    where: {
                        product_id
                    }
            })
            res.status(200).json(orders)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async getOrderById(req, res, next) {
        try {
            const id = req.params.id
            const order = await Order.findOne({
                include: [{
                    model: Product, attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt']
                    }
                }, {
                    model: User,
                    attributes: {
                        exclude: ['id', 'createdAt', 'updatedAt', 'password', 'image_url']
                    }
                }], 
                    where: {
                        id
                    }
            })
            res.status(200).json(order)

        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async editOrder(req, res, next) {
        try {
            const {status} = req.body
            const registrationToken = req.headers.reg_token
            const id = req.params.id
            const order = await Order.update({
                status
            }, {
                where: {
                    id
                },
                include: ['User'],
                returning: true
            })
            const buyer = await User.findByPk(order[1][0].buyer_id)
            const product = await Product.findOne({where:{id:order[1][0].product_id}, include:['User']})
            await History.create({
                product_name: product.name,
                price: order[1][0].price,
                category: 'bought',
                transaction_date: new Date(),
                status: order[1][0].status,
                user_id: order[1][0].buyer_id
            })
            if (status == 'accepted') {
                await History.create({
                    product_name: product.name,
                    price: order[1][0].price,
                    category: 'sold',
                    transaction_date: new Date(),
                    status: order[1][0].status,
                    user_id: req.userData.id
                })
            } 
            await Notification.create({
                 product_id: product.id,
                 bid_price: order[1][0].price,
                 transaction_date: new Date(), 
                 status, 
                 seller_name: product.User.full_name,
                 buyer_name: buyer.full_name,
                 receiver_id: buyer.id
            })
            await Notification.create({
                product_id: product.id,
                bid_price: order[1][0].price,
                transaction_date: new Date(), 
                status, 
                seller_name: product.User.full_name,
                buyer_name: buyer.full_name,
                receiver_id: product.user_id
           })
           if (registrationToken) {
            var option = {
                priority: "high",
                timeToLive: 60*60*24
            }
            var payload = {
                data: {
                    product_id: product.id,
                    bid_price: order[1][0].price,
                    transaction_date: new Date(), 
                    status, 
                    seller_name: product.User.full_name,
                    buyer_name: buyer.full_name,
                    receiver_id: product.user_id
               }
            }
            await adminNotif.messaging().sendToDevice(registrationToken, payload, option)
        }
            res.status(200).json(order[1][0])
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = OrderController