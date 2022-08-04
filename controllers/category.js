const { Category } = require('../models')

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
}

module.exports = CategoryController