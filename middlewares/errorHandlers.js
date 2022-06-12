
const errorHandler = (err, req, res, next) => {
    let code = 500
    switch (err.name) {
        case "badRequestEmail":
            err.message = 'Email already exists'
            code = 400
            break
        case "JsonWebTokenError":
            err.message = err.message
            code = 400
            break
        case "maxProducts":
            err.message = "Max 5 products"
            code = 400
            break
        case "forBiddenBuy":
            err.message = "You cannot buy your own product"
            code = 400
            break
        case "maxOrders":
            err.message = "This product has maximum orders"
            code = 400
            break
        case "redundantOrder":
            err.message = "Product has been order"
            code = 400
            break
        case 'wrongEmailPassword':
            err.message = "email or password are wrong"
            code = 401
            break
        case 'notLogin':
            err.message = "You are not login/access_token is wrong"
            code = 403
            break
        case 'notAllowed':
            err.message = "Access not allowed"
            code = 403
            break
        case 'productNotFound':
            err.message = "Product is not found"
            code = 404
            break
        case 'orderNotFound':
            err.message = "Order is not found"
            code = 404
            break
        default:
            res.locals.message = err.message
            res.status(err.status || 500)

    }
    res.status(code).json(err)
}

module.exports = errorHandler