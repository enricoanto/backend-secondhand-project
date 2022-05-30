'use strict'
const jwt = require('jsonwebtoken');
require('dotenv').config()

const signToken = (payload)=> {
   const token = jwt.sign(payload, process.env.SECRET)
   return token
}

const verifyToken = async (token) => {
    try{
        return jwt.verify(token, process.env.SECRET)
    } catch (err) {
       return {email: "failed@mail.com"}
    }
}

module.exports = {
    signToken,
    verifyToken
}