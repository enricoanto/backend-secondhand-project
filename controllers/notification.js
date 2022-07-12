
const { Notification, Product, User } = require('../models')

class NotificationController {
    static async fetchAllNotifications(req, res, next) {
        try {
            const { notification_type } = req.query
            let filter = {
                receiver_id: req.userData.id
            }
            if (notification_type) {
                filter.notification_type = notification_type
            }
            const notifications = await Notification.findAll({
                where: filter, include: [{ model: Product }, {
                    model: User,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }]
            })
            res.status(200).json(notifications)
        } catch (err) {
            next(err)
        }

    }

    static async getNotificationById(req, res, next) {
        try {
            const { notification_type } = req.query

            let filter = {}
            if (notification_type) {
                filter = {
                    receiver_id: req.userData.id,
                    id: req.params.id,
                    notification_type
                }
            } else {
                filter = {
                    receiver_id: req.userData.id,
                    id: req.params.id
                }
            }
            const notifications = await Notification.findOne({
                where: filter, include: [{ model: Product }, {
                    model: User,
                    attributes: {
                        exclude: ['password', 'createdAt', 'updatedAt']
                    }
                }]
            })
            res.status(200).json(notifications)
        } catch (err) {
            next(err)
        }
    }
    static async readNotificationById(req, res, next) {
        try {
            const notifications = await Notification.update({ read: true }, { where: { id: req.params.id }, returning: true })
            res.status(200).json(notifications[1][0])
        } catch (err) {
            next(err)
        }
    }
}
module.exports = NotificationController