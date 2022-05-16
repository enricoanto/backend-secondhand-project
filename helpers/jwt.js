'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config()

const signToken = (payload)=> {
   const token = jwt.sign(payload, process.env.SECRET)
   console.log(token)
   return token
}

const verifyToken = (token)=> {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {
    signToken,
    verifyToken
}