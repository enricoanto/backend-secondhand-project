
const { Notification, Product, User, Order } = require('../models')

class NotificationController {
    static async fetchAllNotifications(req, res, next) {
        try {
            let filter = {
                receiver_id: req.userData.id
            }
            const notifications = await Notification.findAll({
                where: filter,
                include: [{
                    model: Product,
                    include: [{
                        model: User,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    }]
                }, {
                    model: Order,
                    include: [{
                        model: User,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    }]
                }]
            })
            res.status(200).json(notifications)
        } catch (err) {
            next(err)
        }

    }

    static async getNotificationById(req, res, next) {
        try {
            const id = req.params.id
            const notifications = await Notification.findOne({
                where: {id},
                include: [{
                    model: Product,
                    include: [{
                        model: User,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    }]
                }, {
                    model: Order,
                    include: [{
                        model: User,
                        attributes: {
                            exclude: ['password', 'createdAt', 'updatedAt']
                        }
                    }]
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