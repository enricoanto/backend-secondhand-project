/**
 * @swagger
 * /seller/category:
 *  post:
 *   tags:
 *    - seller
 *   description: Add Category
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   requestBody:
 *    content:
 *     multipart/form-data:
 *      schema:
 *       type: object
 *       required:
 *        - name
 *       properties:
 *        name:
 *         type: string
 *         example: Electronic
 *   responses:
 *    200:
 *     description: OK
 * @swagger
 * /seller/category:
 *  get:
 *   tags:
 *    - seller
 *   description: Fetch Order By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *      schema:
 *        type: integer
 *        description: The car ID
 *   responses:
 *    201:
 *     description: OK
 * /seller/category/{id}:
 *  get:
 *   tags:
 *    - seller
 *   description: Fetch Category by ID
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
 * @swagger
 * /seller/category/{id}:
 *  delete:
 *   tags:
 *    - seller
 *   description: Delete Category By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id   # Note the name is the same as in the path
 *      required: true
 *   responses:
 *    201:
 *     description: OK
 */