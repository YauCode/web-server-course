const authentication = (req, res, next) => {
    console.log(req.query)
    const { user } = req.query
    if (!user) {
        return res.status(401).json({ success: false, msg: 'Unauthorized.' })
    }
    next()
}

module.exports = authentication
