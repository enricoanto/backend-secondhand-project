/**
 * @swagger
 * /seller/banner:
 *  post:
 *   tags:
 *    - seller
 *   description: Add Banner
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
 *        - image
 *       properties:
 *        name:
 *         type: string
 *         example: Promo
 *        image:
 *         type: string
 *         format: binary
 *         description: format jpg/png
 *         example: Promo.jpg
 *   responses:
 *    200:
 *     description: OK
 * @swagger
 * /seller/banner:
 *  get:
 *   tags:
 *    - seller
 *   description: Fetch Banners By ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *      schema:
 *        type: string
 *        description: The Banner ID
 *   responses:
 *    201:
 *     description: OK
 * /seller/Banner/{id}:
 *  get:
 *   tags:
 *    - seller
 *   description: Fetch Banner by ID
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        description: The Banner ID
 *   responses:
 *    201:
 *     description: OK
 * @swagger
 * /seller/banner/{id}:
 *  delete:
 *   tags:
 *    - seller
 *   description: Delete Banner By ID
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