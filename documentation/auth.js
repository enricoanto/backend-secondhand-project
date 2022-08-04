/**
 * @swagger
* /auth/register:
*  post:
*   tags:
*    - Auth
*   description: Register Account
*   requestBody:
*    content:
*     multipart/form-data:
*      schema:
*       type: object
*       required:
*        - email
*        - password
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
*         phone_number: null
*         address: null
*         image_url: null
*         city: null
*         createdAt: 2000-01-01T00:00:00.000Z
*         updatedAt: 2000-01-01T00:00:00.000Z
*    400:
*     description: Email Already Exists.
*     content:
*      schema:
*       example:
*        status: Failed
*        message: Email already exists
*    500:
*     description: Internal Service Error
* @swagger
* /auth/login:
*  post:
*   tags:
*    - Auth
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
*        status: Failed
*        message: email or password are wrong
*    500:
*     description: Internal Service Error
* @swagger
* /auth/user:
*  get:
*   tags:
*    - Auth
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
*         address: Mampang PrPt.
*         image_url: null
*         city: Jakarta
*         createdAt: 2000-01-01T00:00:00.000Z
*         updatedAt: 2000-01-01T00:00:00.000Z
*    500:
*     description: Internal Service Error
* @swagger
* /auth/user:
*  put:
*   tags:
*    - Auth
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
*        city:
*         type: string
*         description: Location/City
*         example: Jakarta
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
*         address: Mampang PrPt.
*         image_url: null
*         city: Jakarta
*         createdAt: 2000-01-01T00:00:00.000Z
*         updatedAt: 2000-01-01T00:00:00.000Z
*    400:
*     description: Email Already Exists.
*     content:
*      schema:
*       example:
*        status: Failed
*        message: Email already exists
*    500:
*     description: Internal Service Error
* @swagger
* /auth/change-password:
*  put:
*   tags:
*    - Auth
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
*        current_password:
*         type: string
*         description: Current Password
*         example: 123456
*        new_password:
*         type: string
*         description: Current Password
*         example: 123456
*        confirm_password:
*         type: string
*         description: Current Password
*         example: 123456
*   responses:
*    200:
*     description: OK
*     content:
*      body:
*       schema:
*        example: 
*         name: OK
*         message: Change password success
*    400:
*     description: Wrong Password
*     content:
*      schema:
*       example:
*        status: Failed
*        message: Password is wrong
*    500:
*     description: Internal Service Error
*/