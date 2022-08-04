var express = require('express');
var router = express.Router();
const UserController = require('../../controllers/user')
const Auth = require('../../middlewares/autentication')

/* GET users listing. */

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/user', Auth.authentication, UserController.getUserById)
router.put('/user', Auth.authentication, UserController.editUser)
router.put('/change-password', Auth.authentication, UserController.changePassword)

module.exports = router;
