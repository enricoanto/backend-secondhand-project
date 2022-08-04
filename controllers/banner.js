const { Banner } = require('../models')

class CategoryController {
    static async getBanners(req, res, next) {
        try {

            const banners = await Banner.findAll()
            res.status(200).json(banners)
        } catch (err) {
            next(err)
        }
    }
    static async getBannerById(req, res, next) {
        try {
            const id = req.params.id
            const banner = await Banner.findByPk(id)
            res.status(200).json(banner)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CategoryController