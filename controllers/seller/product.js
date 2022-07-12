'use strict'
const { Product, ProductCategory, Category, Order, Notification, User } = require('../../models')
const { Op } = require("sequelize");
const admin = require('../../helpers/firebase');
const e = require('express');
const app = require('express')()
app.locals.bucket = admin.storage().bucket()

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
                categories = categories.map(el=> parseInt(el))
            }
            if (!categories || categories.length === 0 || isNaN(categories[0])) { return next({name: "notCategory"}) }
            var image_url
            var image_name
            if (!req.files || Object.keys(req.files).length === 0) {
                return next({name: "noFile"})
            } else {
                let image = req.files.image;
                if (image.size > 1024 * 1024) {
                   return next({ name: 'maxFile' })
                } else if (format.filter(el => image.mimetype.match(el)).length === 0) {
                    
                    return next({ name: 'formatError' })
                } else {
                    image_name = `PR-${Number(new Date())}-${image.name}`
                    image_name = image_name.replace(/ /g, "_")
                    image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2F${image_name}?alt=media`
                    await app.locals.bucket.file(`products/${image_name}`).createWriteStream().end(req.files.image.data)
                }
            }

            const products = await Product.findAll({
                where: {
                    user_id,
                    status: 'available'
                }
            })

            if (products.length < 5) {
                const newProduct = await Product.create({ name, description, base_price, location, user_id, image_url, image_name })
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

                const user = await User.findByPk(req.userData.id)

                await Notification.create({
                    product_id: newProduct.id,
                    status: "create", 
                    seller_name: user.full_name,
                    receiver_id: req.userData.id,
                    image_url,
                    product_name: name,
                    base_price,
                    notification_type: "seller"
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
                }]
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
                categories = categories.map(el=> parseInt(el))
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

            var image_url
            var image_name

            if (!req.files || Object.keys(req.files).length === 0) {
                image_url = productExist.image_url
                image_name = productExist.image_name
            } else {
                let image = req.files.image
                if (image.size > 1024 * 1024) {
                    return next({ name: 'maxFile' })
                } else if (format.filter(el => image.mimetype.match(el)).length === 0) {
                    return next({ name: 'formatError' })
                } else {
                    let image = req.files.image;
                    image_name = `PR-${Number(new Date())}-${image.name}`
                    image_name = image_name.replace(/ /g, "_")
                    image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2F${image_name}?alt=media`
                    await app.locals.bucket.file(`products/${image_name}`).createWriteStream().end(req.files.image.data)
                }
            }

            const updateProduct = await Product.update({
                name: name ? name : productExist.name,
                description: description ? description : productExist.description,
                base_price: base_price ? base_price : productExist.base_price,
                location: location ? location : productExist.location, 
                image_url, 
                image_name
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
            const productExist = await Product.findAll({
                include: ['Orders'],
                where: {
                    [Op.and]: [
                        {
                            id
                        },
                        {
                            '$Orders.status$': 'pending'
                        }
                    ]
                }
            })
            if (productExist.length) {
                next({ name: "redundantOrder" })
            } else {
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
            }
        } catch (err) {
            next(err)
        }
    }

    static async changeStatus (req, res, next) {
        try {
            const id = req.params.id
            const {status} = req.body
            const product = await Product.update({
                status
            }, {
                where: {id},
                returning: true
            })

            res.status(200).json(product[1][0])
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController