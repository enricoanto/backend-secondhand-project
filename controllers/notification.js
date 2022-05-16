const { Notification } = require('../models')

class NotificationController {
    static async fetchAllNotifications(req, res, next) {
        try {
            const notifications = await Notification.findAll({
                where: {
                    receiver_id: req.userData.id
                }
            })
            res.status(200).json(notifications)
        } catch (err) {
            res.status(500).json(err)
        }

    }

    static async getNotificationById(req, res, next) {
        try {
            const notifications = await Notification.findByPk(req.params.id)
            res.status(200).json(notifications)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
module.exports = NotificationController