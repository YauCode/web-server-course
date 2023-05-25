const User = require('../models/User')
const APIError = require('../errors/apierror')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')

const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({ users })
}

const createUser = async (req, res) => {
    const { username, name, email, password, passwordConfirmation } = req.body

    if (!username || !name || !email || !password || !passwordConfirmation) {
        throw new APIError('All fields are required', StatusCodes.BAD_REQUEST)
    }
    if (password !== passwordConfirmation) {
        throw new APIError('Passwords do not match', StatusCodes.EXPECTATION_FAILED)
    }
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)
    const user = new User({
        username,
        name,
        email,
        passwordHash,
    })

    await user.save()
    res.status(StatusCodes.CREATED).json({ success: true, user })
}

const getSingleUser = async (req, res) => {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
        // replace with NotFound error
        return res.status(StatusCodes.NOT_FOUND).send({ success: false, msg: 'No such user' })
    }
    res.status(StatusCodes.OK).json({ user })
}

module.exports = {
    getUsers,
    createUser,
    getSingleUser
}
