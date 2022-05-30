'use strict'
const { Product } = require('../../models')
const { Op } = require("sequelize");

class ProductController {
    static async getMyProducts(req, res, next) {
        try {
            const user_id = +req.userData.id
            const products = await Product.findAll({
                where: {
                    user_id: {
                        [Op.not]: user_id
                    }
                }
            })
            res.status(200).json(products)

        } catch (err) {
            next(err)
        }
    }
    static async getProductById(req, res, next) {
        const user_id = +req.userData.id
        const id = req.params.id
        try {
            const product = await Product.findOne({
                where: {
                    id,
                    user_id: {
                        [Op.not]: user_id
                    }
                }
            })
                res.status(200).json(product)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = ProductController