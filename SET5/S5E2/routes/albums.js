const express = require('express')
const router = express.Router()


const {
    getAlbums,
    getAlbumByID,
    createAlbum,
    updateAlbum,
    deleteAlbum,
} = require('../controllers/albumsController')

router.get('/', getAlbums)
router.get('/:id', getAlbumByID)
router.post('/', createAlbum)
router.put('/:id', updateAlbum)
router.delete('/:id', deleteAlbum)

module.exports = router