const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification')
const Auth = require('../middlewares/autentication')

router.get ('/', Auth.authentication, NotificationController.fetchAllNotifications)
router.get ('/:id',Auth.authentication, Auth.notificationAuthorization, NotificationController.getNotificationById)
router.patch ('/:id',Auth.authentication, Auth.notificationAuthorization, NotificationController.readNotificationById)

module.exports = router