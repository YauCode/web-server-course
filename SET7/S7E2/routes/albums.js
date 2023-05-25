const express = require('express')
const router = express.Router()
const { authUser, authOwner } = require('../middleware/auth')

const {
    getAlbums,
    getAlbumByID,
    createAlbum,
    updateAlbum,
    deleteAlbum,
} = require('../controllers/albumsController')

router.get('/', authUser, getAlbums)
router.get('/:id', [authUser, authOwner], getAlbumByID)
router.post('/', authUser, createAlbum)
router.put('/:id', [authUser, authOwner], updateAlbum)
router.delete('/:id', [authUser, authOwner], deleteAlbum)


module.exports = router