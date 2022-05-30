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
 * /auth/register:
 *  post:
 *   tags:
 *    - auth
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
 *         example: John Doe
 *        email:
 *         type: string
 *         description: Email
 *         example: johndoe@mail.com
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
 *         example: Jakarta
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
 *   tags:
 *    - auth
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
 *         example: johndoe@mail.com
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
 *   tags:
 *    - buyer
 *   description: Create Order
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: header
 *      name: reg_token
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
 *   tags:
 *    - buyer
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
 *   tags:
 *    - buyer
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
 *   tags:
 *    - buyer
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
 *   tags:
 *    - buyer
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
 *   tags:
 *    - buyer
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
 *   tags:
 *    - buyer
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
 *   tags:
 *    - seller
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
 *   tags:
 *    - seller
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
 *   tags:
 *    - seller
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
 *   tags:
 *    - seller
 *   description: Edit Order By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: header
 *      name: reg_token
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
 *   tags:
 *    - seller
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
 *   tags:
 *    - seller
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
 *   tags:
 *    - seller
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
 *   tags:
 *    - seller
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
 *   tags:
 *    - seller
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
 *   tags:
 *    - history
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
 *     description: success
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
 *     description: success 
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