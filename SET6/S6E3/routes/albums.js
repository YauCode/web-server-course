const express = require('express')
const router = express.Router()
const authUser = require('../middleware/auth')


const {
    getAlbums,
    getAlbumByID,
    createAlbum,
    updateAlbum,
    deleteAlbum,
} = require('../controllers/albumsController')

router.get('/', getAlbums)
router.get('/:id', getAlbumByID)
router.post('/', authUser, createAlbum)
router.put('/:id', authUser, updateAlbum)
router.delete('/:id', authUser, deleteAlbum)

module.exports = router