require('dotenv').config()
const swaggerJsdoc = require('swagger-jsdoc')

/**
 * @swagger
 * tags:
 *  - name: Auth
 *  - name: Banner
 *  - name: Category
 *  - name: notification
 *  - name: seller - product
 *  - name: seller - order
 *  - name: buyer - product
 *  - name: buyer - order
 *  - name: buyer - wishlist
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
 *    - in: query
 *      name: notification_type
 *      schema:
 *       type: string
 *       enum: [buyer, seller]
 *   responses:
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *         - id: 1
 *           product_id: 1
 *           bid_price: 1000000
 *           transaction_date: 2000-01-01T00:00:00.000Z
 *           status: bid
 *           read: false
 *           created_at: 2000-01-01T00:00:00.000Z
 *           updated_at: 2000-01-01T00:00:00.000Z
 *           Product: 
 *            id: 1
 *            name: Sepatu
 *            base_price: 1000000
 *            image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *            image_name: PR-1654962957757-sepatu.jpg
 *            location: Jakarta
 *            user_id: 1
 *            status: available
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
 *     content:
 *      body:
 *       schema:
 *        example:
 *         id: 1
 *         product_id: 1
 *         bid_price: 1000000
 *         transaction_date: 2000-01-01T00:00:00.000Z
 *         status: bid
 *         receiver_id: 1
 *         read: false
 *         created_at: 2000-01-01T00:00:00.000Z
 *         updated_at: 2000-01-01T00:00:00.000Z
 *         Product:
 *          id: 1
 *          name: Sepatu
 *          base_price: 1000000
 *          image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *          image_name: PR-1654962957757-sepatu.jpg
 *          location: Jakarta
 *          user_id: 1
 *          status: available
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
 *     content:
 *      body:
 *       schema:
 *        example:
 *         id: 1
 *         product_id: 1
 *         bid_price: 1000000
 *         transaction_date: 2000-01-01T00:00:00.000Z
 *         status: bid
 *         seller_name: john_doe
 *         buyer_name: michael
 *         receiver_id: 2
 *         image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *         read: true
 *         created_at: 2000-01-01T00:00:00.000Z
 *         updated_at: 2000-01-01T00:00:00.000Z
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
        "./documentation/banner.js",
        "./documentation/category.js",
        "./documentation/seller/product.js",
        "./documentation/seller/order.js",
        "./documentation/buyer/product.js",
        "./documentation/buyer/order.js",
        "./documentation/buyer/wishlist.js",
        "./doc.js"]
}
const swaggerDocs = swaggerJsdoc(options)

module.exports = swaggerDocs