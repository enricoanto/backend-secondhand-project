const {Wishlist, Product, Order } = require('../../models')

class WishlistController {
    static async addwishlist (req, res, next) {
        try {
            const {product_id} = req.body
            const user_id = req.userData.id
            const wishlist = await Wishlist.create({
                product_id,
                user_id
            })
            const product = await Product.findByPk(product_id)

            res.status(201).json({name: 'OK', product })
        } catch(err) {
            next(err)
        }
    }

    static async fetchWishlists (req, res, next) {
        try {
            const user_id = req.userData.id
            const wishlists = await Wishlist.findAll({
                where: {
                    user_id
                },
                include: [{model: Product}]
            })
            res.status(200).json(wishlists)
        } catch  (err) {
            next(err)
        }
    }

    static async fetchWishlistbyId (req, res, next) {
        const id = req.params.id
        try {

        } catch (err) {
            next(err)
        }
    }
    static async confirmWishlist (req, res, next) {
        try {
            const bid_price = req.body.bid_price
            const wishlist_id = req.params.id

            const wishlist = await Wishlist.findByPk(wishlist_id)

            const order = await Order.create({
                product_id: wishlist.product_id,
                user_id: wishlist.user_id,
                bid_price
            })
            res.status(201).json(order)
        } catch(err) {
            next(err)
        }
    }
    static async deleteWishlist (req, res, next) {
        try {
            const id = req.params.id
            const deleteWishlist = await Wishlist.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({name: 'OK', message: 'Wishlist success Removed.'})
        } catch(err) {
            next(err)
        }
    }
}

module.exports = WishlistController