const { StatusCodes } = require('http-status-codes')

const authentication = (req, res, next) => {
    console.log(req.query)
    const { user } = req.query
    if (!user) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ success: false, msg: 'Unauthorized.' })
    }
    next()
}

module.exports = authentication
