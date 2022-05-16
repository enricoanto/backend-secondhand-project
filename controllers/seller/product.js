'use strict'
const { Product } = require('../../models')
const { Op } = require("sequelize");
const admin = require('../../helpers/firebase')
const app = require('express')()
app.locals.bucket = admin.storage().bucket()

class ProductController {
    static async addProduct(req, res, next) {
        try {

            const user_id = req.userData.id
            const { name, base_price, category, location } = req.body
            

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
                const newProduct = await Product.create({ name, base_price, category, location, user_id, image_url, image_name })
                res.status(201).json(newProduct)
            } else {
                res.status(400).json({ name: 'Bad Request', msg: 'max products' })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async getMyProducts(req, res, next) {
        try {
            const user_id = req.userData.id

            const products = await Product.findAll({
                where: {
                    user_id
                }
            })
            res.status(200).json(products)

        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async getProductById(req, res, next) {
        const id = req.params.id
        try {
            const product = await Product.findByPk(id)
            res.status(200).json(product)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async editProduct(req, res, next) {
        try {
            const id = +req.params.id
            const { name, base_price, category, location } = req.body

            var image_url 
            var image_name
            if (!req.files || Object.keys(req.files).length === 0) {
               image_url = null
            } else {
                const productExist = await Product.findByPk(id)
                await app.locals.bucket.file(`products/${productExist.image_name}`).delete()
                let image = req.files.image;
                image_name = `PR-${Number(new Date())}-${image.name}`
                image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2F${image_name}?alt=media`
                await app.locals.bucket.file(`products/${image_name}`).createWriteStream().end(req.files.image.data)
            }

            const updateProduct = await Product.update({
                name, base_price, category, location, image_url, image_name
            }, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(updateProduct[1][0])
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async deleteProduct(req, res, next) {
        const id = req.params.id
        try {
            const productExist = await Product.findAll({
                include: ['Orders'],
                where: {
                   [ Op.and]: [
                        {
                            id
                        },
                        {
                            '$Orders.status$':'pending'
                        }
                    ]
                }
            })
            if (productExist.length) {
                res.status(400).json({
                    name: "Bad Request",
                    msg: "Product has been ordered"
                })
            } else {
                await Product.destroy({
                    where: {
                        id
                    }
                })
                res.status(200).json({
                    name: "success",
                    msg: "Product has been deleted"
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = ProductController