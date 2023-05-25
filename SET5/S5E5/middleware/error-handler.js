const APIError = require('../errors/apierror')

// eslint-disable-next-line no-unused-vars
const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof APIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    else if (err.name === 'ValidationError') {
        let errors = {}
        Object.keys(err.errors).forEach((key) => {
            errors[key] = err.errors[key].message
        })
        return res.status(400).send({ success: false, error_name: err.name, errors })
    }
    return res.status(500).json({ msg: 'There was an error, please try again!' })
}

module.exports = errorHandlerMiddleware
