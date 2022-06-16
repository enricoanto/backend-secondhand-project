/**
 * @swagger
 * /buyer/product:
 *  get:
 *   tags:
 *    - buyer
 *   description: Fetch Products
 *   parameters:
 *    - in: query
 *      name: status
 *    - in: query
 *      name: category_id
 *   responses:
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *          - id: 1
 *            name: sepatu
 *            base_price: 1000000
 *            image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-sepatu.jpg?alt=media
 *            image_name: PR-1654962957757-sepatu.jpg
 *            location: Bandung
 *            user_id: 1
 *            created_at: 2000-01-01T00:00:00.000Z
 *            updated_at: 2000-01-01T00:00:00.000Z
 *            categories:
 *             - id: 1
 *               name: Fashion
 *             - id: 2
 *               name: Otomotif
 *             - id: 3
 *               name: Electronic
 *             - id: 4
 *               name: Food
 *          - id: 2
 *            name: baju
 *            base_price: 500000
 *            image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1654962957757-baju.jpg?alt=media
 *            image_name: PR-1654962957757-baju.jpg
 *            location: Bandung
 *            user_id: 1
 *            created_at: 2000-01-01T00:00:00.000Z
 *            updated_at: 2000-01-01T00:00:00.000Z
 *            categories:
 *             - id: 1
 *               name: Fashion
 *             - id: 2
 *               name: Otomotif
 *             - id: 3
 *               name: Electronic
 *             - id: 4
 *               name: Food
 *    500:
 *     description: Internal Service Error
 * @swagger
 * /buyer/product/{id}:
 *  get:
 *   tags:
 *    - buyer
 *   description: Fetch Product By ID
 *   parameters:
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
 *    500:
 *     description: Internal Service Error
 */