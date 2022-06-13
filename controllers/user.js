'use strict'
const { User } = require('../models')
const { comparePassword, hashPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const admin = require('../helpers/firebase')
const app = require('express')()
app.locals.bucket = admin.storage().bucket()


class UserController {
    static async register(req, res, next) {
        try {
            const { full_name, email, password, phone_number, address } = req.body
            const userExist = await User.findOne({
                where: {
                    email
                }
            })
            if (userExist) {
                return next({ name: "badRequestEmail" })
            }
            var image_url
            if (!req.files || Object.keys(req.files).length === 0) {
                image_url = null
            } else {
                let image = req.files.image;
                let img_name = `AV-${Number(new Date())}-${image.name}`
                image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/avatar%2F${img_name}?alt=media`
                await app.locals.bucket.file(`avatar/${img_name}`).createWriteStream().end(req.files.image.data)
            }

            const newUser = await User.create({ full_name, email, password, phone_number, address, image_url })
            res.status(201).json(newUser)
        } catch (err) {
            next(err)
        }
    }
    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({
                where: {
                    email
                }
            })
            if (!user) {
                next({ name: 'wrongEmailPassword' })
            } else if (!comparePassword(password, user.password)) {
                next({ name: 'wrongEmailPassword' })
            } else {
                const access_token = signToken({ email: user.email })
                const userLogin = {
                    name: user.full_name,
                    email: user.email,
                    access_token
                }
                res.status(201).json(userLogin)
            }
        } catch (err) {
            next(err)
        }
    }
    static async getUserById(req, res, next) {
        try {
            const user = await User.findByPk(req.userData.id)
            res.status(200).json(user)
        } catch (err) {
            next(err)
        }
    }
    static async editUser(req, res, next) {
        try {
            const id = req.userData.id
            let { full_name, email, password, phone_number, address } = req.body

            const user = await User.findByPk(req.userData.id)
            var image_url
            if (!req.files || Object.keys(req.files).length === 0) {
                image_url = null
            } else {
                let image = req.files.image;
                let img_name = `AV-${Number(new Date())}-${image.name}`
                image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/avatar%2F${img_name}?alt=media`
                await app.locals.bucket.file(`avatar/${img_name}`).createWriteStream().end(req.files.image.data)
            }


            const updateUser = await User.update({ full_name, email, password: hashPassword(password), phone_number, address, image_url }, {
                where: { id },
                returning: true
            })
            res.status(200).json(updateUser[1][0])
        } catch (err) {
            next(err)
        }
    }

    static async show(req, res) {
        try {
            const users = await User.findAll()
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    }
    static async delete(req, res) {
        try {
            const id = req.params.id
            const users = await User.destroy({
                where: {
                    id
                }
            })
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err)
        }
    }
}

module.exports = UserController