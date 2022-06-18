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
            next(err)
        }

    }

    static async getNotificationById(req, res, next) {
        try {
            const notifications = await Notification.findByPk(req.params.id)
            res.status(200).json(notifications)
        } catch (err) {
            next(err)
        }
    }
    static async readNotificationById(req, res, next) {
        try {
            const notifications = await Notification.findOne({read: true}, {where: {id: req.params.id}, returning:true})
            res.status(200).json(notifications[1][0])
        } catch (err) {
            next(err)
        }
    }
}
module.exports = NotificationController