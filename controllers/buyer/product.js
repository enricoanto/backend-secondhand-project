'use strict'
const { Product, Category } = require('../../models')
const { Op } = require("sequelize");

class ProductController {
    static async getMyProducts(req, res, next) {
        try {
            const {status, category_id } = req.query;
            let filter = []
            if (status) { filter.push ({status}) }
            if (category_id) { filter.push({'$Categories.id$': category_id})}

            const products = await Product.findAll({
                where: {
                    [Op.and]: filter
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
}

module.exports = ProductController