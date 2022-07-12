const express = require('express');
const router = express.Router();
const BannerController = require('../../controllers/seller/banner')

router.get ('/', BannerController.getBanners)
router.get ('/:id', BannerController.getBannerById)
router.delete("/:id", BannerController.deleteBanner)
router.post('/', BannerController.addBanner)

module.exports = router