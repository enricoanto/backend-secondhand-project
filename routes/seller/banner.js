const express = require('express');
const router = express.Router();
const BannerController = require('../../controllers/seller/banner')

router.post ('/', BannerController.addBanner)
router.get ('/', BannerController.getBanners)
router.get ('/:id', BannerController.getBannerById)
router.delete ('/:id', BannerController.deleteBannerById)

module.exports = router