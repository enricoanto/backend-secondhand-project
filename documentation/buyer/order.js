/**
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
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *         id: 1
 *         buyer_id: sepatu
 *         product_id: 1000000
 *         created_at: 2000-01-01T00:00:00.000Z
 *         updated_at: 2000-01-01T00:00:00.000Z
 *         status: pending
 *    400:
 *     description: Bad Request
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: Bad Request
 *         message: you has order for this product
 *    403:
 *     description: Unauthorized
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: notLogin
 *         message: You are not login/access_token is wrong
 *    500:
 *     description: Internal Service Error
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
 *     description: OK
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
 *     description: OK
 *    500:
 *     description: Internal Service Error
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
 *     description: OK
 *    500:
 *     description: Internal Service Error
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
 *     description: OK
 *    500:
 *     description: Internal Service Error
 */