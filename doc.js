require('dotenv').config()
const swaggerJsdoc = require('swagger-jsdoc')

/**
 * @swagger
 * tags:
 *  - name: auth
 *  - name: seller
 *  - name: buyer
 *  - name: history
 *  - name: notification
 * /history:
 *  get:
 *   tags:
 *    - history
 *   description: Register Account
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: OK
 * /history/{id}:
 *  get:
 *   tags:
 *    - history
 *   description: Register Account
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id   # Note the name is the same as in the path
 *      required: true
 *   responses:
 *    200:
 *     description: OK
 * @swagger
 * /notification:
 *  get:
 *   tags:
 *    - notification
 *   description: Fetch Notifications
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: OK 
 * @swagger
 * /notification/{id}:
 *  get:
 *   tags:
 *    - notification
 *   description: Fetch Notification By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id   # Note the name is the same as in the path
 *      required: true
 *   responses:
 *    200:
 *     description: OK
 * @swagger
 * /notification/{id}:
 *  patch:
 *   tags:
 *    - notification
 *   description: Fetch Notification By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id   # Note the name is the same as in the path
 *      required: true
 *   responses:
 *    200:
 *     description: OK
 */


const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "market-final-project",
            version: "1.0"
        },
        servers: [{ url: process.env.URL_SERVERS }]
    },
    apis: ["./documentation/auth.js",
        "./documentation/seller/banner.js",
        "./documentation/seller/category.js",
        "./documentation/seller/product.js",
        "./documentation/seller/order.js",
        "./documentation/buyer/product.js",
        "./documentation/buyer/order.js",
        "./doc.js"]
}
const swaggerDocs = swaggerJsdoc(options)

module.exports = swaggerDocs