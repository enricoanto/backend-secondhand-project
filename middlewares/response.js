
const response = (err, req, res, next) => {
    let code = 200
    switch (res.name) {
        case "OK":
            res.message = 'Success retrieve data!'
            code = 200
            break
        default:
            res.status(code).json(res)

    }
    res.status(code).json(err)
}

module.exports = response