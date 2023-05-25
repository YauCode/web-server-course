const APIError = require('../errors/apierror')
const Album = require('../models/Album')

// GET All
const getAlbums = async (req, res) => {

    const { sort, numericFilters, fields, artist, title } = req.query
    const queryObject = {}

    // Search functionality for artist names and album titles using regex
    if (artist) queryObject.artist = { $regex: artist, $options: 'i' }
    if (title) queryObject.title = { $regex: title, $options: 'i' }

    // Numeric Filters
    if (numericFilters) {
        const operatorMap = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        }
        const regEx = /\b(>|>=|=|<|<=)\b/g
        let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`)
        console.log(filters)
        const options = ['year']
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-')
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) }
            }
        })
    }

    let result = Album.find(queryObject)

    // FIELDS
    if (fields) {
        const fieldsList = fields.split(',').join(' ')
        result = result.select(`${fieldsList}`)
    }

    // SORTING
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result = result.sort(sortList)
    }
    else {
        result = result.sort('title')
    }
    const albums = await result

    res.status(200).json({ success: true, data: albums, nbHits: albums.length })
}

// GET One by ID
const getAlbumByID = async (req, res) => {
    const { id } = req.params
    const singleAlbum = await Album.findById(id)

    if (!singleAlbum) {
        throw new APIError(`Album with id:${id} NOT FOUND`, 404)
    }
    return res.status(200).json({ success: true, data: singleAlbum })

}


// CREATE
const createAlbum = async (req, res) => {
    const { artist, title, year, genre, tracks } = req.body

    if (!artist || !title) {
        throw new APIError('Artist and Title must be provided', 400)
    }

    const album = new Album({
        artist,
        title,
        year,
        genre,
        tracks
    })

    const savedAlbums = await album.save()
    return res.status(201).send({ success: true, data: savedAlbums })

}

// UPDATE
const updateAlbum = async (req, res) => {
    const { id } = req.params
    const singleAlbum = await Album.findById(id)

    if (!singleAlbum) {
        throw new APIError(`Album with id:${id} NOT FOUND`, 404)
    }

    await Album.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
    res.status(201).json({ success: true, msg: `Album with id:${id} UPDATED` })
}


// DELETE
const deleteAlbum = async (req, res) => {
    const { id } = req.params
    const singleAlbum = await Album.findById(id)

    if (!singleAlbum) {
        throw new APIError(`Album with id:${id} NOT FOUND`, 404)
    }
    await Album.findByIdAndRemove(id)
    res.status(200).send({ success: true, msg: `Album with id:${id} DELETED` })

}


module.exports = {
    getAlbums,
    getAlbumByID,
    createAlbum,
    updateAlbum,
    deleteAlbum,
}
