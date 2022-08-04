const express = require('express');
const router = express.Router();
const BannerController = require('../controllers/banner')

router.get ('/', BannerController.getBanners)
router.get ('/:id', BannerController.getBannerById)

module.exports = router