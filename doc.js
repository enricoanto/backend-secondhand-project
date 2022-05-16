require('dotenv').config()
const swaggerJsdoc = require('swagger-jsdoc')

/**
 * @swagger
 * /auth/register:
 *  post:
 *   description: Register Account
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       type: object
 *       properties:
 *        full_name:
 *         type: string
 *         description: Full Name
 *         example: Enrico Dwidhanto Indrawan
 *        email:
 *         type: string
 *         description: Email
 *         example: enrico@mail.com
 *        password:
 *         type: string
 *         description: Password
 *         example: 123456
 *        phone_number:
 *         type: integer
 *         description: Phone Number
 *         example: 081121934455
 *        address:
 *         type: string
 *         description: Location/City
 *         example: Bandung
 *        image:
 *         type: string
 *         format: binary
 *         description: format jpg/png
 *         example: avatar.jpg
 *   responses:
 *    201:
 *     description: success
 *    400:
 *     description: Email Already Exists.
 * @swagger
 * /auth/login:
 *  post:
 *   description: Login Account
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        email:
 *         type: string
 *         description: Email
 *         example: enrico@mail.com
 *        password:
 *         type: string
 *         description: Password
 *         example: 123456
 *   responses:
 *    201:
 *     description: success
 * @swagger
 * /buyer/order:
 *  post:
 *   description: Create Order
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        product_id:
 *         type: integer
 *         description: Product ID
 *         example: 1
 *        bid_price:
 *         type: integer
 *         description: Bid Price
 *         example: 1000000
 *   responses:
 *    201:
 *     description: success
 * @swagger
 * /buyer/order:
 *  get:
 *   description: Fetch Orders
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: success
 * @swagger
 * /buyer/order/{id}:
 *  get:
 *   description: Fetch Order By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        description: The car ID
 *   responses:
 *    201:
 *     description: success
 * @swagger
 * /buyer/order/{id}:
 *  put:
 *   description: Edit Order By Id
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id   # Note the name is the same as in the path
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        product_id:
 *         type: integer
 *         description: Product ID
 *         example: 1
 *        bid_price:
 *         type: integer
 *         description: Bid Price
 *         example: 1000000
 *   responses:
 *    201:
 *     description: success
 * @swagger
 * /buyer/order/{id}:
 *  delete:
 *   description: Delete Order By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id   # Note the name is the same as in the path
 *      required: true
 *   responses:
 *    200:
 *     description: success
 * @swagger
 * /buyer/product:
 *  get:
 *   description: Fetch Products
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: success
 * @swagger
 * /buyer/product/{id}:
 *  get:
 *   description: Fetch Product By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id   # Note the name is the same as in the path
 *      required: true
 *   responses:
 *    200:
 *     description: success
 * @swagger
 * /seller/order:
 *  get:
 *   description: Get Orders
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: success
 * @swagger
 * /seller/order/{id}:
 *  get:
 *   description: Fetch Order By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        description: The car ID
 *   responses:
 *    201:
 *     description: success
 * /seller/order/product/{product_id}:
 *  get:
 *   description: Fetch Order By Product ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        description: The car ID
 *   responses:
 *    201:
 *     description: success
 * @swagger
 * /seller/order/{id}:
 *  patch:
 *   description: Edit Order By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id   # Note the name is the same as in the path
 *      required: true
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        product_id:
 *         type: integer
 *         description: Product ID
 *         example: 1
 *        bid_price:
 *         type: integer
 *         description: Bid Price
 *         example: 1000000
 *   responses:
 *    201:
 *     description: success
 * @swagger
 * /seller/product:
 *  post:
 *   description: Fetch Products
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         description: Name of Product
 *         example: Sepatu
 *        base_price:
 *         type: integer
 *         description: Base Price
 *         example: 1000000
 *        category:
 *         type: string
 *         description: Category
 *         example: shoes
 *        location:
 *         type: string
 *         description: Location
 *         example: Bandung
 *        image:
 *         type: string
 *         format: binary
 *         description: format jpg/png
 *         example: avatar.jpg
 *   responses:
 *    201:
 *     description: success
 * @swagger
 * /seller/product:
 *  get:
 *   description: Register Account
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: success
 * @swagger
 * /seller/product/{id}:
 *  get:
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
 *     description: success
 * @swagger
 * /seller/product/{id}:
 *  put:
 *   description: Fetch Products
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id   # Note the name is the same as in the path
 *      required: true
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       type: object
 *       properties:
 *        name:
 *         type: string
 *         description: Name of Product
 *         example: Sepatu
 *        base_price:
 *         type: integer
 *         description: Base Price
 *         example: 1000000
 *        category:
 *         type: string
 *         description: Category
 *         example: shoes
 *        location:
 *         type: string
 *         description: Location
 *         example: Bandung
 *        image:
 *         type: string
 *         format: binary
 *         description: format jpg/png
 *         example: avatar.jpg
 *   responses:
 *    201:
 *     description: success
* @swagger
 * /seller/product/{id}:
 *  delete:
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
 *     description: success
 * @swagger
 * /history:
 *  get:
 *   description: Register Account
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: success
  * /history/{id}:
 *  get:
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
 *     description: success
 * @swagger
 * /history:
 *  get:
 *   description: Register Account
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: success 
 * /history/{id}:
 *  get:
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
 *     description: success
 * @swagger
 * /history:
 *  get:
 *   description: Fetch Histories
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: success
  * /history/{id}:
 *  get:
 *   description: Fetch History By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id   # Note the name is the same as in the path
 *      required: true
 *   responses:
 *    200:
 *     description: success
 * @swagger
 * /notification:
 *  get:
 *   description: Fetch Notifications
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: success 
 * /notification/{id}:
 *  get:
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
 *     description: success
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
    apis: ["./doc.js"]
}
const swaggerDocs = swaggerJsdoc(options)

module.exports = swaggerDocs