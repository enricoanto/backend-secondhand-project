'use strict'
const { User } = require('../models')
const { comparePassword, hashPassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const upload_image = require('../helpers/upload-image')


class UserController {
    static async register(req, res, next) {
        try {
            const { full_name, email, password } = req.body
            const userExist = await User.findOne({ where: { email } })

            if (userExist) { return next({ name: "badRequestEmail" }) }

            const newUser = await User.create({ full_name, email, password })
            delete newUser.password
            res.status(201).json(newUser)
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ where: { email } })

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
            let { full_name, phone_number, address, city } = req.body
            const format = ['image/jpeg', 'image/jpg', 'image/png']

            const user = await User.findByPk(req.userData.id)
            let image
            if (!req.files || Object.keys(req.files).length === 0) {
                image.name = user.image_name
                image.url = user.image_url
            } else {
                image = req.files.image;
                if (image.size > 1024 * 1024) {
                    next({ name: 'maxFile' })
                } else if (format.filter(el => image.mimetype.match(el)).length === 0) {
                    next({ name: 'formatError' })
                } else {
                   image = await upload_image(req.files, 'avatar')
                }
            }

            const updateUser = await User.update({
                full_name: full_name ? full_name : user.full_name,
                phone_number: phone_number ? phone_number : user.phone_number,
                address: address ? address : user.address,
                image_name: image.name ? image.name : user.image_url,
                image_url: image.url ? image.url : user.image_url,
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

    static async changePassword(req, res, next) {
        try {
            const { current_password, new_password, confirm_password } = req.body
            const user_id = req.userData.id

            const user = await User.findByPk(user_id)

            if (!comparePassword(current_password, user.password)) {
                next({ name: 'wrongPassword' })
            } else if (new_password !== confirm_password) {
                next({ name: 'wrongConfirmPassword' })
            } else {
                await User.update({
                    password: hashPassword(new_password)
                }, {
                    where: {
                        id: user_id
                    }
                })
                res.status(200).json({
                    name: "OK",
                    message: "Change password success"
                })
            }

        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController