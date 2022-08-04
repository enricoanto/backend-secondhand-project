/**
 * @swagger
 * /category:
 *  get:
 *   tags:
 *    - Category
 *   description: Fetch Categories By ID
 *   responses:
 *    200:
 *     description: OK
 * /category/{id}:
 *  get:
 *   tags:
 *    - Category
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