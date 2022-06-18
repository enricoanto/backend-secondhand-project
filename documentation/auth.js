/**
 * @swagger
* /auth/register:
*  post:
*   tags:
*    - auth
*   description: Register Account
*   requestBody:
*    content:
*     multipart/form-data:
*      schema:
*       type: object
*       required:
*        - full_name
*        - email
*        - password
*        - phone_number
*        - address
*        - image
*       properties:
*        full_name:
*         type: string
*         description: Full Name
*         example: John Doe
*        email:
*         type: string
*         description: Email
*         example: johndoe@mail.com
*        password:
*         type: string
*         description: Password
*         example: 123456
*        phone_number:
*         type: integer
*         description: Phone Number
*         example: 081121934455
*        address:
*         type: string
*         description: Location/City
*         example: Jakarta
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
*         full_name: John Doe
*         email: johndoe@mail.com
*         password: $2b$10$A7gqzQD5E/NJl4NJHeLpEuHK8cIsFLEBz4RSLKqua8N1EKFnB53Vy
*         phone_number: 81121934455
*         address: Jakarta
*         image_url: null
*         createdAt: 2000-01-01T00:00:00.000Z
*         updatedAt: 2000-01-01T00:00:00.000Z
*    400:
*     description: Email Already Exists.
*     content:
*      schema:
*       example:
*        name: badRequestEmail
*        message: Email already exists
*    500:
*     description: Internal Service Error
* @swagger
* /auth/login:
*  post:
*   tags:
*    - auth
*   description: Login Account
*   requestBody:
*    required:
*     - email
*     - password
*    content:
*     application/json:
*      schema:
*       type: object
*       properties:
*        email:
*         type: string
*         description: Email
*         example: johndoe@mail.com
*        password:
*         type: string
*         description: Password
*         example: 123456
*   responses:
*    201:
*     description: OK
*     content:
*      schema:
*       example: 
*        id: 1
*        name: John Doe
*        email: johndoe@mail.com
*        access_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG5kb2VAbWFpbC5jb20iLCJpYXQiOjE2NTQ5MjcxODZ9.fghFryd8OPEHztZlrN50PtZj0EC7NWFVj2iPPN9xi1M
*    401:
*     description: Email or Password Are Wrong
*     content:
*      schema:
*       example: 
*        name: wrongEmailPassword
*        message: email or password are wrong
*    500:
*     description: Internal Service Error
* @swagger
* /auth/user:
*  get:
*   tags:
*    - auth
*   description: find user by id
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
*         id: 1
*         full_name: John Doe
*         email: johndoe@mail.com
*         password: $2b$10$A7gqzQD5E/NJl4NJHeLpEuHK8cIsFLEBz4RSLKqua8N1EKFnB53Vy
*         phone_number: 81121934455
*         address: Jakarta
*         image_url: null
*         createdAt: 2000-01-01T00:00:00.000Z
*         updatedAt: 2000-01-01T00:00:00.000Z
*    500:
*     description: Internal Service Error
* @swagger
* /auth/user/{id}:
*  put:
*   tags:
*    - auth
*   description: Register Account
*   parameters:
*    - in: header
*      name: access_token
*      required: true
*   requestBody:
*    content:
*     multipart/form-data:
*      schema:
*       type: object
*       properties:
*        full_name:
*         type: string
*         description: Full Name
*         example: John Doe
*        email:
*         type: string
*         description: Email
*         example: johndoe@mail.com
*        password:
*         type: string
*         description: Password
*         example: 123456
*        phone_number:
*         type: integer
*         description: Phone Number
*         example: 081121934455
*        address:
*         type: string
*         description: Location/City
*         example: Jakarta
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
*         full_name: John Doe
*         email: johndoe@mail.com
*         password: $2b$10$A7gqzQD5E/NJl4NJHeLpEuHK8cIsFLEBz4RSLKqua8N1EKFnB53Vy
*         phone_number: 81121934455
*         address: Jakarta
*         image_url: null
*         createdAt: 2000-01-01T00:00:00.000Z
*         updatedAt: 2000-01-01T00:00:00.000Z
*    400:
*     description: Email Already Exists.
*     content:
*      schema:
*       example:
*        name: badRequestEmail
*        message: Email already exists
*    500:
*     description: Internal Service Error
*/