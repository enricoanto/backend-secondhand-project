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
            const { full_name, email, password, phone_number, address, city } = req.body
            const format = ['image/jpeg', 'image/jpg', 'image/png']

            const userExist = await User.findOne({
                where: {
                    email
                }
            })
            if (userExist) {
                return next({ name: "badRequestEmail" })
            }
            var image_url
            let image
            if (!req.files || Object.keys(req.files).length === 0) {
                image_url = null
            } else if (format.filter(el => image.mimetype.match(el)).length === 0) {
                return next({ name: 'formatError' })
            } else {
                image = req.files.image;
                let img_name = `AV-${Number(new Date())}-${image.name}`
                img_name = img_name.replace(/ /g, "_")
                image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/avatar%2F${img_name}?alt=media`
                await app.locals.bucket.file(`avatar/${img_name}`).createWriteStream().end(req.files.image.data)
            }

            const newUser = await User.create({ full_name, email, password, phone_number, address, image_url, city })
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
                    id: user.id,
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
            let { full_name, email, password, phone_number, address, city } = req.body
            const format = ['image/jpeg', 'image/jpg', 'image/png']

            const user = await User.findByPk(req.userData.id)
            var image_url
            if (!req.files || Object.keys(req.files).length === 0) {
                image_url = user.image_url
            } else {
                let image = req.files.image;
                if (image.size > 1024 * 1024) {
                    next({ name: 'maxFile' })
                } else if (format.filter(el => image.mimetype.match(el)).length === 0) {
                    next({ name: 'formatError' })
                } else {
                    let img_name = `AV-${Number(new Date())}-${image.name}`
                    img_name = img_name.replace(/ /g, "_")
                    image_url = `https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/avatar%2F${img_name}?alt=media`
                    await app.locals.bucket.file(`avatar/${img_name}`).createWriteStream().end(req.files.image.data)
                }
            }


            const updateUser = await User.update({
                full_name: full_name ? full_name : user.full_name,
                email: email ? email : user.email,
                password: password ? hashPassword(password) : user.password,
                phone_number: phone_number ? phone_number : user.phone_number,
                address: address ? address : user.address,
                image_url: image_url ? image_url : user.image_url,
                city: city ? city : user.city
            }, {
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
    static async changePassword(req, res, next) {
        try {
            const { current_password, new_password, confirm_password } = req.body
            const user_id = req.userData.id

            const user = await User.findByPk(user_id)

            if (!comparePassword(current_password, user.password)) {
                next({name: 'wrongPassword'})
            } else if (new_password !== confirm_password) {
                next({name: 'wrongConfirmPassword'})
            } else {
                await User.update({
                    password:  hashPassword(new_password)
                }, {
                    where: {
                        id: user_id
                    }
                })
                res.status(200).json({
                    name: "OK",
            message: "Change password success"})
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController