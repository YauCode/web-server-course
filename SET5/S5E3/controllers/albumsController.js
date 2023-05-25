const Album = require('../models/Album')

// GET All
const getAlbums = async (req, res) => {

    const { sort, numericFilters, fields } = req.query
    const queryObject = {}

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

    try {
        const album = new Album({
            artist,
            title,
            year,
            genre,
            tracks
        })
        await album.save()
        return res.status(201).send({ success: true, data: album })
    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = {}
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message
            })
            return res.status(400).send({ success: false, error_name: error.name, errors })
        }
        res.status(400).send({ success: false, msg: error })
    }

}

// UPDATE
const updateAlbum = async (req, res) => {
    try {
        await Album.updateOne({ _id: req.params.id }, req.body, { runValidators: true })
        // eslint-disable-next-line quotes
        res.status(201).json({ success: true, msg: `Album updated` })
    } catch (error) {
        if (error.name === 'ValidationError') {
            let errors = {}
            Object.keys(error.errors).forEach((key) => {
                errors[key] = error.errors[key].message
            })
            return res.status(400).send({ success: false, error_name: error.name, errors })
        }
        res.status(500).json({ success: false, msg: error })
    }
}


// DELETE
const deleteAlbum = async (req, res) => {
    try {
        await Album.deleteOne({ _id: req.params.id })
        // eslint-disable-next-line quotes
        res.status(200).send({ success: true, msg: `Album deleted` })
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
