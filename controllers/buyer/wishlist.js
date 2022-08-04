const { Wishlist, Product, Order, Category, Notification } = require('../../models')

class WishlistController {
    static async addwishlist(req, res, next) {
        try {
            const { product_id } = req.body
            const user_id = req.userData.id
            const wishlist = await Wishlist.create({
                product_id,
                user_id
            })
            const product = await Product.findByPk(product_id)
            if (!product) { return next({name: 'productNotFound'}) }
            if (product.status == 'sold') { return next({name: 'productSold'})}
            res.status(201).json({ name: 'OK', product })
        } catch (err) {
            next(err)
        }
    }

    static async fetchWishlists(req, res, next) {
        try {
            const user_id = req.userData.id
            const wishlists = await Wishlist.findAll({
                where: {
                    user_id
                },
                include: [{
                    model: Product,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt']
                    },
                    include: [{
                        model: Category,
                        through: {
                            attributes: []
                        },
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }]
                }]
            })
            res.status(200).json(wishlists)
        } catch (err) {
            next(err)
        }
    }

    static async fetchWishlistbyId(req, res, next) {
        const id = req.params.id
        try {
            const wishlist = await Wishlist.findOne({
                where: {
                    id
                },
                include: [{ model: Product,
                     attributes: {
                    exclude: ['createdAt', 'updatedAt']
                } }]
            })
            res.status(200).json(wishlist)
        } catch (err) {
            next(err)
        }
    }
    static async confirmWishlist(req, res, next) {
        try {
            const bid_price = req.body.bid_price
            const wishlist_id = req.params.id

            const wishlist = await Wishlist.findByPk(wishlist_id)

            const order = await Order.create({
                product_id: wishlist.product_id,
                buyer_id: wishlist.user_id,
                bid_price,
                transaction_date: new Date()
            })

            if (order) {
                await Wishlist.destroy({
                    where: {
                        id: wishlist_id
                    }
                })
                const product = await Product.findByPk(wishlist.product_id)

                await Notification.create({
                    product_id: product.id,
                    transaction_date: new Date(),
                    status: "bid",
                    receiver_id: product.user_id,
                    order_id: order.id,
                })
            }
            res.status(200).json(order)
        } catch (err) {
            next(err)
        }
    }
    static async deleteWishlist(req, res, next) {
        try {
            const id = req.params.id
            await Wishlist.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({ name: 'OK', message: 'Wishlist success Removed.' })
        } catch (err) {
            next(err)
        }
    }
}

module.exports = WishlistController