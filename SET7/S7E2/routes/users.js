const express = require('express')
const router = express.Router()
const { authUser, authAdmin } = require('../middleware/auth')

const {
    getUsers,
    createUser,
    getSingleUser,
    deleteUser
} = require('../controllers/usersController')


router.get('/', [authUser, authAdmin], getUsers)
router.post('/', [authUser, authAdmin], createUser)
router.get('/:id', [authUser, authAdmin], getSingleUser)
router.delete('/:id', [authUser, authAdmin], deleteUser)

module.exports = router
