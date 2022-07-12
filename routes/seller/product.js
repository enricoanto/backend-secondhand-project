const express = require('express');
const router = express.Router();
const ProductController = require('../../controllers/seller/product')
const Auth = require('../../middlewares/autentication')

router.post('/', ProductController.addProduct)
router.get ('/', ProductController.getMyProducts)
router.get ('/:id', Auth.authorization, ProductController.getProductById)
router.put ('/:id', Auth.authorization, ProductController.editProduct)
router.patch('/:id', Auth.authorization, ProductController.changeStatus)
router.delete ('/:id', Auth.authorization, ProductController.deleteProduct)

module.exports = router