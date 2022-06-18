'use strict'
const { Product, ProductCategory, Category, Order } = require('../../models')
const { Op } = require("sequelize");
const admin = require('../../helpers/firebase');
const app = require('express')()
app.locals.bucket = admin.storage().bucket()

class ProductController {
    static async addProduct(req, res, next) {
        try {
            const user_id = req.userData.id
            const { name, description, base_price, category_ids, location } = req.body
            let categories = category_ids
            if (typeof categories == 'string') {
                categories = categories.split(',')
            }
            var image_url
            var image_name
            if (!req.files || Object.keys(req.files).length === 0) {
                image_url = null
            } else {
                let image = req.files.image;
                image_name = `PR-${Number(new Date())}-${image.name}`
                image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2F${image_name}?alt=media`
                await app.locals.bucket.file(`products/${image_name}`).createWriteStream().end(req.files.image.data)
            }

            const products = await Product.findAll({
                where: {
                    user_id
                }
            })

            if (products.length < 5) {
                const newProduct = await Product.create({ name, description, base_price, location, user_id, image_url, image_name })
                Promise.all(
                    categories.map(async el => {

                        let result = await ProductCategory.create({
                            category_id: el,
                            product_id: newProduct.id
                        })
                        return result
                    })
                )

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
            const { name, description, base_price, category_ids, location } = req.body
            let categories = category_ids
            if (typeof categories == 'string') {
                categories = categories.split(',')
            }

            var image_url
            var image_name
            if (!req.files || Object.keys(req.files).length === 0) {
                image_url = null
            } else {
                const productExist = await Product.findByPk(id)
                if (productExist.image_name) {
                    await app.locals.bucket.file(`products/${productExist.image_name}`).delete()
                }
                let image = req.files.image;
                image_name = `PR-${Number(new Date())}-${image.name}`
                image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2F${image_name}?alt=media`
                await app.locals.bucket.file(`products/${image_name}`).createWriteStream().end(req.files.image.data)
            }
            await ProductCategory.destroy({
                where:
                    { product_id: id }
            })

            Promise.all(
                categories.map(async el => {
                    let result = await ProductCategory.create({
                        category_id: el,
                        product_id: id
                    })
                    return result
                })
            )

            const updateProduct = await Product.update({
                name, description, base_price, location, image_url, image_name
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
                if (productExist.image_name) {
                    await app.locals.bucket.file(`products/${productExist.image_name}`).delete()
                }
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
}

module.exports = ProductController