const albums = require('../data/albumsData')
const _ = require('lodash')
const Album = require('../models/Album')

class AlbumAPI {
    constructor() {
    }
    initialize(config) {
    }
    async getAlbums(args) {
        return await Album.find({})
    }
    async getAlbumById(_id) {
        return await Album.findById(_id)
    }
    async deleteAlbumById(_id) {
        const album = await Album.findByIdAndDelete(_id)
        return album
    }
}
module.exports = AlbumAPI