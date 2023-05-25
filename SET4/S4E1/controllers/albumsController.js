// let { albums } = require('../data')
const Album = require('../models/Album')

// GET All
const getAlbums = async (req, res) => {
    const albums = await Album.find({})
    res.status(200).json({ success: true, data: albums })
}

// GET One by ID
const getAlbumByID = async (req, res) => {
    const { id } = req.params
    try {
        const singleAlbum = await Album.findById(id)
        return res.status(200).json({ success: true, data: singleAlbum })
    } catch (error) {
        res.status(404).json({ success: false, msg: error })
    }
}


// CREATE
const createAlbum = async (req, res) => {

    const { artist } = req.body
    const { title } = req.body
    const { year } = req.body
    const { genre } = req.body
    const { tracks } = req.body

    if (!artist || !title || !year || !genre || !tracks) {
        return res
            .status(400)
            .json({ success: false, msg: 'Some album data is not provided' })
    }
    const album = new Album({
        artist,
        title,
        year,
        genre,
        tracks
    })
    try {
        await album.save()
        return res.status(201).send({ success: true, data: album })
    } catch (error) {
        res.status(400).send({ success: false, msg: error })
    }

}

// UPDATE
const updateAlbum = async (req, res) => {
    try {
        await Album.updateOne({ _id: req.params.id }, req.body)
        res.status(201).json({ success: true })
    } catch (error) {
        res.status(500).json({ success: false, msg: error })
    }
}


// DELETE
const deleteAlbum = async (req, res) => {
    try {
        await Album.deleteOne({ _id: req.params.id })
        res.status(200).send({ success: true })
    } catch (error) {
        res.status(400).send({ success: false, msg: error })
    }
}


module.exports = {
    getAlbums,
    getAlbumByID,
    createAlbum,
    updateAlbum,
    deleteAlbum,
}
