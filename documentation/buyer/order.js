/**
 * @swagger
 * /buyer/order:
 *  post:
 *   tags:
 *    - buyer - order
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
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *        example:
 *           id: 1
 *           product_id: 1
 *           buyer_id: 2
 *           price: 800000
 *           transcaction_date: 2022-07-02T17:26:29.984Z
 *           status: pending
 *           createdAt: 2022-07-02T17:26:29.984Z
 *           updatedAt: 2022-07-02T17:26:29.984Z
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
 *    - buyer - order
 *   description: Fetch Orders
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
 *           buyer_id: 2
 *           bid_price: 500000
 *           transcaction_date: 2022-07-02T17:26:29.984Z
 *           status: pending
 *           createdAt: 2022-07-02T17:26:29.984Z
 *           updatedAt: 2022-07-02T17:26:29.984Z
 *           Product:
 *            id: 1
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
 *           buyer_id: 2
 *           bid_price: 4000000
 *           transcaction_date: 2022-07-02T17:26:29.984Z
 *           status: accepted
 *           createdAt: 2022-07-02T17:26:29.984Z
 *           updatedAt: 2022-07-02T17:26:29.984Z
 *           Product:
 *            id: 2
 *            name: Mobile Phone
 *            description: desc mobile phone
 *            base_price: 5000000
 *            image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/products%2FPR-3556505199383-add.png?alt=media
 *            image_name: PR-3556505199383-add.png
 *            location: Surabaya
 *            user_id: 3
 *            status: sold
 *            User:
 *             id: 3
 *             full_name: Victorious
 *             email: victorious@mail.com
 *             phone_number: 81121934477
 *             address: Gubeng
 *             city: Surabaya
 *           User:
 *            id: 2
 *            full_name: Michael
 *            email: michael@mail.com
 *            phone_number: 81121934466
 *            address: Dago
 *            city: Bandung
 * @swagger
 * /buyer/order/{id}:
 *  get:
 *   tags:
 *    - buyer - order
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
 *           bid_price: 500000
 *           transcaction_date: 2022-07-02T17:26:29.984Z
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
 *    500:
 *     description: Internal Service Error
 * @swagger
 * /buyer/order/{id}:
 *  put:
 *   tags:
 *    - buyer - order
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
 *           id: 1
 *           product_id: 1
 *           buyer_id: 2
 *           bid_price: 800000
 *           transcaction_date: 2022-07-02T17:26:29.984Z
 *           status: pending
 *           createdAt: 2022-07-02T17:26:29.984Z
 *           updatedAt: 2022-07-02T17:26:29.984Z
 *    500:
 *     description: Internal Service Error
 * @swagger
 * /buyer/order/{id}:
 *  delete:
 *   tags:
 *    - buyer - order
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