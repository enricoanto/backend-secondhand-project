'use strict'
const { History, User, Product } = require('../models')

class HistoryController {
    static async getMyHistories(req, res, next) {
        try {
            const user_id = +req.userData.id
            const histories = await History.findAll({
                where: {
                    user_id: user_id
                },
                include: [{
                    model: Product
                }]
            })
            res.status(200).json(histories)

        } catch (err) {
            next(err)
        }
    }
    static async getHistoryById(req, res, next) {
        const id = req.params.id
        try {
            const history = await History.findOne({
                where: {
                    id
                },
                include: [{
                    model: Product
                }]
            })
            res.status(200).json(history)
        } catch (err) {
            next(err)
        }
    }
}

module.exports = HistoryController