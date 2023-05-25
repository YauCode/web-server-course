const User = require('../models/User')
const { APIError, BadRequestError, NotFoundError } = require('../errors')
const bcrypt = require('bcryptjs')
const { StatusCodes } = require('http-status-codes')

const getUsers = async (req, res) => {
    const users = await User.find({})
    res.status(StatusCodes.OK).json({ users })
}

const createUser = async (req, res) => {
    const { username, name, email, password, passwordConfirmation } = req.body

    if (!username || !name || !email || !password || !passwordConfirmation) {
        throw new BadRequestError('All fields are required')
    }
    if (password !== passwordConfirmation) {
        throw new APIError('Passwords do not match', StatusCodes.EXPECTATION_FAILED)
    }
    // Checking the database for duplicate usernames
    const userExists = await User.findOne({ username })
    if (userExists) {
        throw new APIError(`User with username: ${username} is already exists!`, StatusCodes.CONFLICT)
    }

    // Checking the database for duplicate email addresses
    const emailExists = await User.findOne({ email })
    if (emailExists) {
        throw new APIError(`User with email: ${email} is already exists!`, StatusCodes.CONFLICT)
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
        throw new NotFoundError(`User with id:${id} NOT FOUND`)
    }
    res.status(StatusCodes.OK).json({ user })
}

module.exports = {
    getUsers,
    createUser,
    getSingleUser
}
