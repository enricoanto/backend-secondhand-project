'use strict'
const { Product, Category, User } = require('../../models')
const { Op } = require("sequelize");

class ProductController {
    static async getMyProducts(req, res, next) {
        try {
            const { status, category_id, search, page, per_page } = req.query;
            let filter = []
            if (status) { filter.push({ status }) }
            if (category_id) { filter.push({ '$Categories.id$': category_id }) }
            if (search) {
                filter.push({ name: { [Op.iLike]: `%${search}%` } })
            }
            if (page && per_page) {
                let offset = per_page * (page - 1)
                const products = await Product.findAndCountAll({
                    limit: per_page,
                    offset,
                    order: [['name', 'ASC'], ['id', 'ASC']],
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
                    }],
                    subQuery: false,
                    order: [['id', 'ASC']]
                })
            
                res.status(200).json(products.rows)
            } else {
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
                    }],
                    order: [['id', 'ASC']]
                })
                res.status(200).json(products)
            }

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
                }, {
                    model: User,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'password']
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