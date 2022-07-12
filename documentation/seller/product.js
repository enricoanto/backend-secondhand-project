/** 
 * @swagger
 * /seller/product:
 *  post:
 *   tags:
 *    - seller - product
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
 *       required:
 *        - name
 *        - description
 *        - base_price
 *        - category_ids
 *        - location
 *        - image
 *       properties:
 *        name:
 *         type: string
 *         description: Name of Product
 *         example: Sepatu
 *        description:
 *         type: string
 *         description: Name of Product
 *         example: Sepatu
 *        base_price:
 *         type: integer
 *         description: Base Price
 *         example: 1000000
 *        category_ids:
 *         description: Categories
 *         type: array
 *         items:
 *          type: integer
 *         example: [1, 2, 3, 4]
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
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *         id: 1
 *         name: sepatu
 *         description: Description Sepatu
 *         base_price: 1000000
 *         image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *         image_name: PR-1654962957757-sepatu.jpg
 *         location: Bandung
 *         user_id: 1
 *         created_at: 2000-01-01T00:00:00.000Z
 *         updated_at: 2000-01-01T00:00:00.000Z
 *    400:
 *     description: Bad Request
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: maxProducts
 *         message: Max 5 products
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
 * /seller/product:
 *  get:
 *   tags:
 *    - seller - product
 *   description: Register Account
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *   responses:
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *         - id: 1
 *           name: sepatu
 *           description: Description Sepatu
 *           base_price: 1000000
 *           image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *           image_name: PR-1654962957757-sepatu.jpg
 *           location: Bandung
 *           user_id: 1
 *           created_at: 2000-01-01T00:00:00.000Z
 *           updated_at: 2000-01-01T00:00:00.000Z
 *         - id: 2
 *           name: baju
 *           description: Description Baju
 *           base_price: 500000
 *           image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-baju.jpg?alt=media
 *           image_name: PR-1654962957757-baju.jpg
 *           location: Bandung
 *           user_id: 1
 *           created_at: 2000-01-01T00:00:00.000Z
 *           updated_at: 2000-01-01T00:00:00.000Z
 *           categories:
 *            - id: 1
 *              name: Fashion
 *            - id: 2
 *              name: Otomotif
 *            - id: 3
 *              name: Electronic
 *            - id: 4
 *              name: Food
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
 * /seller/product/{id}:
 *  get:
 *   tags:
 *    - seller - product
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
 *     content:
 *      body:
 *       schema:
 *        example:
 *         id: 1
 *         name: sepatu
 *         description: Description Sepatu
 *         base_price: 1000000
 *         image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *         image_name: PR-1654962957757-sepatu.jpg
 *         location: Bandung
 *         user_id: 1
 *         created_at: 2000-01-01T00:00:00.000Z
 *         updated_at: 2000-01-01T00:00:00.000Z
 *         categories:
 *          - id: 1
 *            name: Fashion
 *          - id: 2
 *            name: Otomotif
 *          - id: 3
 *            name: Electronic
 *          - id: 4
 *            name: Food
 *    400:
 *     description: Not Found
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: productNotFound
 *         message: Product is not found
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
 * /seller/product/{id}:
 *  put:
 *   tags:
 *    - seller - product
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
 *         required: true
 *         description: Name of Product
 *         example: Sepatu
 *        description:
 *         type: string
 *         description: Name of Product
 *         example: Sepatu
 *        base_price:
 *         type: integer
 *         description: Base Price
 *         example: 1000000
 *        category_ids:
 *         description: Categories
 *         type: array
 *         items:
 *          type: integer
 *         example: [1, 2, 3, 4]
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
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *         id: 1
 *         name: sepatu
 *         description: Description Sepatu
 *         base_price: 1000000
 *         image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *         image_name: PR-1654962957757-sepatu.jpg
 *         location: Bandung
 *         user_id: 1
 *         created_at: 2000-01-01T00:00:00.000Z
 *         updated_at: 2000-01-01T00:00:00.000Z
  *    400:
 *     description: Not Found
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: productNotFound
 *         message: Product is not found
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
 * /seller/product/{id}:
 *  patch:
 *   tags:
 *    - seller - product
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
 *        status:
 *         required: true
 *         enum: [available, seller]
 *         type: string
 *   responses:
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *         id: 1
 *         name: sepatu
 *         description: Description Sepatu
 *         base_price: 1000000
 *         image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *         image_name: PR-1654962957757-sepatu.jpg
 *         location: Bandung
 *         user_id: 1
 *         created_at: 2000-01-01T00:00:00.000Z
 *         updated_at: 2000-01-01T00:00:00.000Z
  *    400:
 *     description: Not Found
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: productNotFound
 *         message: Product is not found
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
 * /seller/product/{id}:
 *  delete:
 *   tags:
 *    - seller - product
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
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: OK
 *         message: Product has been deleted
 *    400:
 *     description: Not Found
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: productNotFound
 *         message: Product is not found
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
 */