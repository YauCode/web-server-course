const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const { UnauthenticatedError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const login = async (req, res) => {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const passwordCorrect = user === null ? false : await bcrypt.compare(password, user.passwordHash)
    if (!(user && passwordCorrect)) {
        throw new UnauthenticatedError('Invalid username or password')
    }
    const userForToken = {
        username: user.username,
        id: user._id,
    }
    const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN })
    res.status(StatusCodes.OK).send({ token, username: user.username })
}

module.exports = login
