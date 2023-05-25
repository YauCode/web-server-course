const mongoose = require('mongoose')

const albumSchema = new mongoose.Schema(
    {
        artist: String,
        title: String,
        year: Number,
        genre: String,
        tracks: Number
    },
    {
        versionKey: false,
    }
)

module.exports = mongoose.model('Album', albumSchema, 'albumsCollection')

