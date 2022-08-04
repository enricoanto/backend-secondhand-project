/** 
 * @swagger
 * /buyer/wishlist:
 *  post:
 *   tags:
 *    - buyer - wishlist
 *   description: Add Wishlist
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
 *        - product_id
 *       properties:
 *        product_id:
 *         type: integer
 *         description: Product ID
 *         example: 1
 *   responses:
 *    201:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: OK
 *         Product:
 *          id: 1
 *          name: sepatu
 *          description: Description Sepatu
 *          base_price: 1000000
 *          image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *          image_name: PR-1654962957757-sepatu.jpg
 *          location: Bandung
 *          user_id: 1
 *          created_at: 2000-01-01T00:00:00.000Z
 *          updated_at: 2000-01-01T00:00:00.000Z
 *    500:
 *     description: Internal Service Error
 * @swagger
 * /buyer/wishlist:
 *  get:
 *   tags:
 *    - buyer - wishlist
 *   description: Fetch All Wishlists
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
 *           product_id: 1
 *           user_id: 1
 *           Product:
 *            name: sepatu
 *            description: Description Sepatu
 *            base_price: 1000000
 *            image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *            image_name: PR-1654962957757-sepatu.jpg
 *            location: Bandung
 *            user_id: 1
 *            created_at: 2000-01-01T00:00:00.000Z
 *            updated_at: 2000-01-01T00:00:00.000Z
 *         - id: 2
 *           product_id: 2
 *           user_id: 1
 *           Product:
 *            name: baju
 *            description: Description Baju
 *            base_price: 500000
 *            image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-baju.jpg?alt=media
 *            image_name: PR-1654962957757-baju.jpg
 *            location: Bandung
 *            user_id: 1
 *            created_at: 2000-01-01T00:00:00.000Z
 *            updated_at: 2000-01-01T00:00:00.000Z
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
 * /buyer/wishlist/{id}:
 *  get:
 *   tags:
 *    - buyer - wishlist
 *   description: GET Wishlist by ID
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
 *           id: 1
 *           product_id: 1
 *           user_id: 1
 *           Product:
 *            name: sepatu
 *            description: Description Sepatu
 *            base_price: 1000000
 *            image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *            image_name: PR-1654962957757-sepatu.jpg
 *            location: Bandung
 *            user_id: 1
 *            created_at: 2000-01-01T00:00:00.000Z
 *            updated_at: 2000-01-01T00:00:00.000Z
 *    400:
 *     description: Not Found
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: wishlistNotFound
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
 * /buyer/wishlist/{id}:
 *  put:
 *   tags:
 *    - buyer - wishlist
 *   description: delete Wishlist
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
 *         name: OK
 *         message: Wishlist success Removed.
 *    400:
 *     description: Not Found
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: wishlistNotFound
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
 * /buyer/wishlist/{id}:
 *  delete:
 *   tags:
 *    - buyer - wishlist
 *   description: delete Wishlist
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
 *         message: Wishlist success Removed.
 *    400:
 *     description: Not Found
 *     content:
 *      body:
 *       schema:
 *        example:
 *         name: wishlistNotFound
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