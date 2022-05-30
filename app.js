const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors')
const fileUpload = require('express-fileupload')
const swaggerUI = require('swagger-ui-express')
const swaggerDocs = require('./doc')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const errorHandler = require('./middlewares/errorHandlers');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(fileUpload());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);

// error handler
app.use(errorHandler);

module.exports = app;
