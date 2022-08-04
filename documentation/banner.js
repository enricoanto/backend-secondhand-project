/**
 * @swagger
 * /banner:
 *  get:
 *   tags:
 *    - Banner
 *   description: Fetch Banners
 *   responses:
 *    200:
 *     description: OK
 *     content:
 *      body:
 *       schema:
 *       example:
 *        - id: 1
 *          name: Promo
 *          image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/banner%2FBAN-1656828994177-promo.png?alt=media
 *        - id: 2
 *          name: Lebran
 *          image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/banner%2FBAN-1656828994176-lebaran.png?alt=media
 * /Banner/{id}:
 *  get:
 *   tags:
 *    - Banner
 *   description: Fetch Banner by ID
 *   parameters:
 *    - in: path
 *      name: id
 *      required: true
 *      schema:
 *        type: integer
 *        description: The Banner ID
 *   responses:
 *    200:
 *     description: OK
*     content:
 *      body:
 *       schema:
 *       example:
 *          id: 1
 *          name: Promo
 *          image_url: https://firebasestorage.googleapis.com/v0/b/market-final-project.appspot.com/o/banner%2FBAN-1656828994177-promo.png?alt=media
 */