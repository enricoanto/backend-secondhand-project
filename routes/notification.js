const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification')
const Auth = require('../middlewares/autentication')

router.get ('/', Auth.authentication, NotificationController.fetchAllNotifications)
router.get ('/:id',Auth.authentication, NotificationController.getNotificationById)

module.exports = router