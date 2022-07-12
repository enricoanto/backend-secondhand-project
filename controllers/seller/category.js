const { Category, ProductCategory } = require('../../models')

class CategoryController {
    static async getCategories(req, res, next) {
        try {
            const categories = await Category.findAll()
            res.status(200).json(categories)
        } catch (err) {
            next(err)
        }
    }
    static async getCategoryById(req, res, next) {
        try {
            const id = req.params.id
            const category = await Category.findByPk(id)
            res.status(200).json(category)
        } catch (err) {
            next(err)
        }
    }
    static async addCategory(req, res) {
        try {
            const name = req.body.name
            const category = await Category.create({ name })
            res.status(201).json(category)
        } catch (err) {
            console.log(err)
        }
    }

    static async changeProductCategory(req, res) {
        try {
            const { current_category, new_category } = req.body
            const product_category = await ProductCategory.update({
                category_id: new_category
            }, {
                where: {
                    category_id: current_category
                },
                returning: true
            })
            res.status(200).json(product_category)
        } catch (err) {
            console.log(err)
        }
    }

    static async deleteCategory(req, res) {
        try {
            const { id } = req.params
            const category = await Category.destroy({
                where: {
                    id
                }
            })
            res.status(200).json(category)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = CategoryController