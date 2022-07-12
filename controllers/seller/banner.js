const { Banner } = require('../../models')
const app = require('express')()
const admin = require('../../helpers/firebase');
app.locals.bucket = admin.storage().bucket()

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
    static async deleteBanner(req, res, next) {
        try {
            const id = req.params.id

            const deleteBanner = await Banner.destroy({
                where: {
                    id
                }
            })
            res.status(200).json("delete")

        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async addBanner(req, res, next) {
        try {
            const { name } = req.body

            var image_url
            var image_name

            if (!req.files || Object.keys(req.files).length === 0) {
                return next({ name: "noFile" })
            } else {
                let image = req.files.image;
                image_name = `BAN-${Number(new Date())}-${image.name}`
                image_name = image_name.replace(/ /g, "_")
                image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/banner%2F${image_name}?alt=media`
                await app.locals.bucket.file(`banner/${image_name}`).createWriteStream().end(req.files.image.data)

            }

            const addBanner = await Banner.create({
                name, image_url

            })
            res.status(200).json(addBanner)

        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = CategoryController