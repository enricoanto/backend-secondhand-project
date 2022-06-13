const { Banner } = require('../../models')
const app = require('express')()
const admin = require('../../helpers/firebase');
app.locals.bucket = admin.storage().bucket()

class CategoryController {
    static async addBanner(req, res, next) {
        try {
            const user_id = req.userData.id
            const { name } = req.body
            var image_url
            var image_name
            if (!req.files || Object.keys(req.files).length === 0) {
                image_url = null
            } else {
                let image = req.files.image;
                image_name = `BAN-${Number(new Date())}-${image.name}`
                image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/banner%2F${image_name}?alt=media`
                await app.locals.bucket.file(`banner/${image_name}`).createWriteStream().end(req.files.image.data)
            }

            const banner = await Banner.create({name, image_url, image_name, user_id})
            res.status(201).json(banner)
        } catch (err) {
            next(err)
        }
    }
    static async getBanners(req, res, next) {
        try {
            const user_id = req.userData.id
            const banners = await Banner.findAll({where: {user_id}})
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
    static async deleteBannerById(req, res, next) {
        try {
            const id = req.params.id
            const bannerExist = await Banner.findByPk(id)
            const banner = await Banner.destroy({where: {
                id
            }})
            if (bannerExist.image_name) {
                await app.locals.bucket.file(`banner/${bannerExist.image_name}`).delete()
            }
            res.status(200).json(banner)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = CategoryController