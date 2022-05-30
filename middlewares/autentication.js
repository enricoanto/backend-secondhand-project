const { verifyToken } = require('../helpers/jwt');
const { User, Product, Order } = require('../models')

class Auth {
    static async authentication(req, res, next) {
        try {
            const decoded = await verifyToken(req.headers.access_token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if (user) {
                req.userData = user
                next()
            } else {
                next({ name: 'notLogin', message: 'you are not login' })
            }

        } catch (err) {
            next(err)
        }
    }
    static async authorization(req, res, next) {
        try {
            const id = req.params.id
            const user_id = req.userData.id
            const product = await Product.findByPk(id)
            if (!product) {
                next({ name: "productNotFound" })
            } else if (product.user_id !== user_id) {
                next({name: 'notAllowed'})
            } else {
                next()
            }
        } catch (err) {
            next(err)
        }
    }
    static async orderAuthorization(req, res, next) {
        try {
            const id = req.params.id
            const user_id = req.userData.id
            const order = await Order.findByPk(id)
            if (!order) {
                next({ name: "orderNotFound" })
            } else if (order.buyer_id !== user_id) {
                next({name: 'notAllowed'})
            } else {
                next()
            }
        } catch (err) {
            next(err)
        }
    }
    static async confirmAuthorization(req, res, next) {
        try {
            const id = req.params.id
            const user_id = req.userData.id
            const order = await Order.findOne({
                where: {
                    id
                },
                include: ['Product']
            })
            if (!order) {
                next({ name: "orderNotFound" })
            } else if (order.Product.user_id !== user_id) {
                next({name: 'notAllowed'})
            } else {
                next()
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Auth