const { UnauthenticatedError, UnauthorizedError, NotFoundError } = require('../errors')
const Album = require('../models/Album')

const authUser = async (req, res, next) => {
    if (!req.user) {
        throw new UnauthenticatedError('Please loggin to pass this route')
    }
    next()
}

// Authorize Admin 
const authAdmin = async (req, res, next) => {
    console.log(req.user.role)
    if (!(req.user.role === 'admin')) {
        throw new UnauthorizedError('You need to have Admin rights to pass this route')
    }
    next()
}


//Cheking Ownership of the Requested Album
const authOwner = async (req, res, next) => {
    if (req.user.role === 'admin') return next()

    const { id } = req.params
    const singleAlbum = await Album.findById(id)
    if (!singleAlbum) {
        throw new NotFoundError(`Album with id:${id} NOT FOUND`)
    }

    if (!singleAlbum.owner.equals(req.user.id)) {
        console.log(req.user.id)
        throw new UnauthorizedError('This album belongs to another user')
    }
    next()
}

module.exports = { authUser, authAdmin, authOwner }