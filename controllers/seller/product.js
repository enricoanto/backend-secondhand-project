'use strict'
const { Product, ProductCategory, Category, Order, Notification, User } = require('../../models')
const { Op } = require("sequelize");
const upload_image = require('../../helpers/upload-image')

class ProductController {
    static async addProduct(req, res, next) {
        try {
            const user_id = req.userData.id
            const { name, description, base_price, category_ids, location } = req.body
            const format = ['image/jpeg', 'image/jpg', 'image/png']

            let categories = category_ids
            if (typeof categories == 'string') {
                categories = categories.replace('[', '')
                categories = categories.replace(']', '')
                categories = categories.split(',')
                categories = categories.map(el => parseInt(el))
            }
            if (!categories || categories.length === 0 || isNaN(categories[0])) { return next({ name: "notCategory" }) }
            let image
            if (!req.files || Object.keys(req.files).length === 0) {
                return next({ name: "noFile" })
            } else {
                if (req.files.image.size > 1024 * 1024) {
                    return next({ name: 'maxFile' })
                } else if (format.filter(el => req.files.image.mimetype.match(el)).length === 0) {
                    return next({ name: 'formatError' })
                } else {
                    image = await upload_image(req.files, 'product')
                }
            }

            const products = await Product.findAll({
                where: {
                    user_id,
                    status: 'available'
                }
            })

            if (products.length < 5) {
                const newProduct = await Product.create({
                    name,
                    description,
                    base_price,
                    location,
                    user_id,
                    image_url: image.url,
                    image_name: image.name
                })
                Promise.all(
                    categories.map(async el => {
                        try {
                            let result = await ProductCategory.create({
                                category_id: el,
                                product_id: newProduct.id
                            })
                            return result

                        } catch (err) {
                            next(err)
                        }
                    })
                )

                await Notification.create({
                    product_id: newProduct.id,
                    status: "create",
                    receiver_id: req.userData.id
                })

                res.status(201).json(newProduct)
            } else {
                next({ name: 'maxProducts' })
            }
        } catch (err) {
            next(err)
        }
    }
    static async getMyProducts(req, res, next) {
        try {
            const user_id = req.userData.id

            const products = await Product.findAll({
                where: {
                    user_id
                },
                include: [{
                    model: Category,
                    through: {
                        attributes: []
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'ProductCategory']
                    }
                }],
                order: [['id', 'ASC']]
            })
            res.status(200).json(products)

        } catch (err) {
            next(err)
        }
    }
    static async getProductById(req, res, next) {
        const id = req.params.id
        try {
            const product = await Product.findOne({
                where: {
                    id
                },
                include: [{
                    model: Category,
                    through: {
                        attributes: []
                    },
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'ProductCategory']
                    }
                }]
            })
            res.status(200).json(product)
        } catch (err) {
            next(err)
        }
    }
    static async editProduct(req, res, next) {
        try {
            const id = +req.params.id
            const format = ['image/jpeg', 'image/jpg', 'image/png']
            const { name, description, base_price, category_ids, location } = req.body
            let categories = category_ids
            if (typeof categories == 'string') {
                categories = categories.replace('[', '')
                categories = categories.replace(']', '')
                categories = categories.split(',')
                categories = categories.map(el => parseInt(el))
            }
            if (categories) {
                await ProductCategory.destroy({
                    where:
                        { product_id: id }
                })
                Promise.all(
                    categories.map(async el => {
                        if (!isNaN(el)) {
                            await ProductCategory.create({
                                category_id: el,
                                product_id: id
                            })
                        }
                    })

                )
            }

            const productExist = await Product.findByPk(id)

            let image = {}
            if (!req.files || Object.keys(req.files).length === 0) {
                image.url = productExist.image_url
                image.name = productExist.image_name
            } else {
                if (req.files.image.size > 1024 * 1024) {
                    return next({ name: 'maxFile' })
                } else if (format.filter(el => req.files.image.mimetype.match(el)).length === 0) {
                    return next({ name: 'formatError' })
                } else {
                    image = await upload_image(req.files, 'product')
                }
            }

            const updateProduct = await Product.update({
                name: name ? name : productExist.name,
                description: description ? description : productExist.description,
                base_price: base_price ? base_price : productExist.base_price,
                location: location ? location : productExist.location,
                image_name: image.name,
                image_url: image.url
            }, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(updateProduct[1][0])
        } catch (err) {
            next(err)
        }
    }
    static async deleteProduct(req, res, next) {
        const id = req.params.id
        try {
            await Product.destroy({
                where: {
                    id
                }
            })
            await ProductCategory.destroy({
                where: {
                    product_id: id
                }
            })
            await Order.destroy({
                where: {
                    product_id: id
                }
            })
            res.status(200).json({
                name: "OK",
                msg: "Product has been deleted"
            })
        } catch (err) {
            next(err)
        }
    }

    static async changeStatus(req, res, next) {
        try {
            const id = req.params.id
            const { status } = req.body
            const product = await Product.update({
                status
            }, {
                where: { id },
                returning: true
            })

            const order = await Order.update({
                status: 'declined'
            }, {
                where: {
                    product_id: product[1][0].id,
                    status: 'accepted'
                },
                returning: true
            })

            if (!order[0]) {
                return res.status(400).json({ name: 'notSold', message: 'Product has not sold yet' })
            }
            const buyer = await User.findByPk(order[1][0].buyer_id)

            await Notification.create({
                product_id: product[1][0].id,
                bid_price: order[1][0].price,
                transaction_date: new Date(),
                status: "declined",
                receiver_id: buyer.id,
                order_id: order[1][0].id,
            })
            res.status(200).json(product[1][0])
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController