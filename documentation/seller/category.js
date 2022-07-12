/**
 * @swagger
 * /seller/category:
 *  get:
 *   tags:
 *    - seller - category
 *   description: Fetch Categories By ID
 *   responses:
 *    200:
 *     description: OK
 * /seller/category/{id}:
 *  get:
 *   tags:
 *    - seller - category
 *   description: Fetch Category by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        description: The car ID
 *   responses:
 *    200:
 *     description: OK
 */