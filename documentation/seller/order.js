/**
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
 *     description: OK
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
 *     description: OK
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
 *      name: product_id
 *      required: true
 *      schema:
 *        type: integer
 *        description: The car ID
 *   responses:
 *    201:
 *     description: OK
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
 *        status:
 *         type: string
 *   responses:
 *    201:
 *     description: OK
 */