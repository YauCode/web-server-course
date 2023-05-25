const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema(
    {
        artist: {
            type: String,
            required: [true, 'Artist name is required'],
        },
        title: {
            type: String,
            required: [true, 'Album title is required'],
        },

        year: {
            type: Number,
            min: [1900, 'Album release year must be >1900'],
            max: [new Date().getFullYear(), 'Album release year must be <= current year date'],
        },

        genre: String,
        tracks: {
            type: Number,
            min: [1, 'At least one track is required for the album'],
        },

    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('Album', albumSchema, 'albumsCollection')

