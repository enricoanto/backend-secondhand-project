var express = require('express');
var router = express.Router();
const UserController = require('../../controllers/user')

/* GET users listing. */

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/:id', UserController.getUserById)

module.exports = router;
