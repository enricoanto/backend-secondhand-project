const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/seller/category')

router.post ('/', CategoryController.addCategory)
router.get ('/', CategoryController.getCategories)
router.get ('/:id', CategoryController.getCategoryById)
router.delete ('/:id', CategoryController.deleteCategoryById)

module.exports = router