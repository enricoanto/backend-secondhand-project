/**
 * @swagger
 * /seller/order:
 *  get:
 *   tags:
 *    - seller - order
 *   description: Get Orders
 *   parameters:
 *    - in: header
 *      name: access_token
 *      required: true
 *    - in: query
 *      name: status
 *      schema:
 *       type: string
 *       enum: [accepted, declined, pending]
 *   responses:
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *         - id: 1
 *           product_id: 1
 *           buyer_id: 2
 *           price: 500000
 *           transcaction_date: null
 *           product_name: Sepatu
 *           base_price: 1000000
 *           image_product: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1556505199383-add.png?alt=media
 *           status: pending
 *           createdAt: 2022-07-02T17:26:29.984Z
 *           updatedAt: 2022-07-02T17:26:29.984Z
 *           Product:
 *            id: 2
 *            name: Sepatu
 *            description: desc sepatu
 *            base_price: 1000000
 *            image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1556505199383-add.png?alt=media
 *            image_name: PR-1556505199383-add.png
 *            location: Jakarta
 *            user_id: 1
 *            status: available
 *            User:
 *             id: 1
 *             full_name: John Doe
 *             email: johndoe@mail.com
 *             phone_number: 81121934455
 *             address: Mampang Prpt.
 *             city: Jakarta
 *           User:
 *            id: 2
 *            full_name: Michael
 *            email: michael@mail.com
 *            phone_number: 81121934466
 *            address: Dago
 *            city: Bandung
 *         - id: 2
 *           product_id: 2
 *           buyer_id: 3
 *           price: 4000000
 *           transcaction_date: 2022-07-02T17:26:29.984Z
 *           product_name: Mobile Phone
 *           base_price: 5000000
 *           image_product: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-3556505199383-add.png?alt=media
 *           status: accepted
 *           createdAt: 2022-07-02T17:26:29.984Z
 *           updatedAt: 2022-07-02T17:26:29.984Z
 *           Product:
 *            id: 2
 *            name: Sepatu
 *            description: desc sepatu
 *            base_price: 1000000
 *            image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1556505199383-add.png?alt=media
 *            image_name: PR-1556505199383-add.png
 *            location: Jakarta
 *            user_id: 1
 *            status: available
 *            User:
 *             id: 1
 *             full_name: John Doe
 *             email: johndoe@mail.com
 *             phone_number: 81121934455
 *             address: Mampang Prpt.
 *             city: Jakarta
 *           User:
 *            id: 2
 *            full_name: Victorious
 *            email: victirious@mail.com
 *            phone_number: 81121934477
 *            address: Buah Batu
 *            city: Bandung

 * @swagger
 * /seller/order/{id}:
 *  get:
 *   tags:
 *    - seller - order
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
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *           id: 1
 *           product_id: 1
 *           buyer_id: 2
 *           price: 500000
 *           transcaction_date: null
 *           product_name: Sepatu
 *           base_price: 1000000
 *           image_product: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1556505199383-add.png?alt=media
 *           status: pending
 *           createdAt: 2022-07-02T17:26:29.984Z
 *           updatedAt: 2022-07-02T17:26:29.984Z
 *           Product:
 *            id: 2
 *            name: Sepatu
 *            description: desc sepatu
 *            base_price: 1000000
 *            image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1556505199383-add.png?alt=media
 *            image_name: PR-1556505199383-add.png
 *            location: Jakarta
 *            user_id: 1
 *            status: available
 *            User:
 *             id: 1
 *             full_name: John Doe
 *             email: johndoe@mail.com
 *             phone_number: 81121934455
 *             address: Mampang Prpt.
 *             city: Jakarta
 *           User:
 *            id: 2
 *            full_name: Michael
 *            email: michael@mail.com
 *            phone_number: 81121934466
 *            address: Dago
 *            city: Bandung
 * /seller/order/product/{product_id}:
 *  get:
 *   tags:
 *    - seller - order
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
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *         id: 1
 *         product_id: 1
 *         buyer_id: 2
 *         price: 500000
 *         transcaction_date: null
 *         product_name: Sepatu
 *         base_price: 1000000
 *         image_product: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1556505199383-add.png?alt=media
 *         status: pending
 *         createdAt: 2022-07-02T17:26:29.984Z
 *         updatedAt: 2022-07-02T17:26:29.984Z
 *         Product:
 *          id: 2
 *          name: Sepatu
 *          description: desc sepatu
 *          base_price: 1000000
 *          image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1556505199383-add.png?alt=media
 *          image_name: PR-1556505199383-add.png
 *          location: Jakarta
 *          user_id: 1
 *          status: available
 *          User:
 *           id: 1
 *           full_name: John Doe
 *           email: johndoe@mail.com
 *           phone_number: 81121934455
 *           address: Mampang Prpt.
 *           city: Jakarta
 *         User:
 *          id: 2
 *          full_name: Michael
 *          email: michael@mail.com
 *          phone_number: 81121934466
 *          address: Dago
 *          city: Bandung
 * @swagger
 * /seller/order/{id}:
 *  patch:
 *   tags:
 *    - seller - order
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
 *     multipart/form-data:
 *      schema:
 *       type: object
 *       properties:
 *        status:
 *         type: string
 *         enum: [accepted, declined]
 *         default: accepted
 *       example:
 *        status: accepted/declined
 *   responses:
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *           id: 1
 *           product_id: 1
 *           buyer_id: 2
 *           price: 500000
 *           transcaction_date: 2022-07-02T17:26:29.984Z
 *           product_name: Sepatu
 *           base_price: 1000000
 *           image_product: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-1556505199383-add.png?alt=media
 *           status: declined
 *           user_id: 1
 *           createdAt: 2022-07-02T17:26:29.984Z
 *           updatedAt: 2022-07-02T17:26:29.984Z
 */