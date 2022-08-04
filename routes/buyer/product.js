const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/buyer/product')

router.get ('/', ProductController.getMyProducts)
router.get ('/:id', ProductController.getProductById)

module.exports = router