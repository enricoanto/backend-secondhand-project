const express = require('express');
const router = express.Router();
const CategoryController = require('../../controllers/seller/category')

router.get ('/', CategoryController.getCategories)
router.get ('/:id', CategoryController.getCategoryById)
// router.post('/', CategoryController.addCategory)
// router.put('/product-category', CategoryController.changeProductCategory)
// router.delete('/:id', CategoryController.deleteCategory)

module.exports = router