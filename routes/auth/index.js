var express = require('express');
var router = express.Router();
const UserController = require('../../controllers/user')
const Auth = require('../../middlewares/autentication')

/* GET users listing. */

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/user/:id', Auth.authentication, UserController.getUserById)
router.put('/user/:id', Auth.authentication, UserController.editUser)


module.exports = router;
