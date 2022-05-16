const { verifyToken } = require('../helpers/jwt');
const { User, Product, Order } = require('../models')

class Auth {
    static async authentication(req, res, next) {
        try {
            const decoded = verifyToken(req.headers.access_token)
            const user = await User.findOne({
                where: {
                    email: decoded.email
                }
            })
            if (user) {
                req.userData = user
                next()
            } else {
                res.status(401).json({ name: 'unauthorized', message: 'you are not login'})
            }

        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async authorization(req, res, next) {
        try {
            const id = req.params.id
            const user_id = req.userData.id
            const product = await Product.findByPk(id)
            if (!product) {
                res.status(404).json({
                    name: "Not Found",
                    msg: "Product is not Found"
                })
            } else if (product.user_id !== user_id) {
                res.status(403).json({
                    name: "Unauthorized",
                    msg: "You cannot access"
                })
            } else {
                next()
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async orderAuthorization(req, res, next) {
        try {
            const id = req.params.id
            const user_id = req.userData.id
            const order = await Order.findByPk(id)
            if (!order) {
                res.status(404).json({
                    name: "Not Found",
                    msg: "Order is not Found"
                })
            } else if (order.buyer_id !== user_id) {
                res.status(403).json({
                    name: "Unauthorized",
                    msg: "You cannot access"
                })
            } else {
                next()
            }
        } catch (err) {
            res.status(500).json(err)
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
                res.status(404).json({
                    name: "Not Found",
                    msg: "Order is not Found"
                })
            } else if (order.Product.user_id !== user_id) {
                res.status(403).json({
                    name: "Unauthorized",
                    msg: "You cannot access"
                })
            } else {
                next()
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = Auth