'use strict'
const bcrypt = require('bcrypt');

const hashPassword =  (payload)=> {
    return bcrypt.hashSync(payload, 10)
}

const comparePassword = (password, hash)=> {
    return bcrypt.compareSync(password, hash)
}

module.exports = {
    hashPassword, comparePassword
}