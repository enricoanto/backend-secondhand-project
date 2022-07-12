const express = require('express');
const router = express.Router();
const WishlistController = require('../../controllers/buyer/wishlist')
const Auth = require('../../middlewares/autentication')

router.post('/', WishlistController.addwishlist)
router.put ('/:id', Auth.wishlistAuthorization, WishlistController.confirmWishlist)
router.delete ('/:id', Auth.wishlistAuthorization, WishlistController.deleteWishlist)

module.exports = router