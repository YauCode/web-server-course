const albums = require('../data/albumsData')
const _ = require('lodash')

class AlbumAPI {
    constructor() {
    }
    initialize(config) {
    }
    getAlbums(args) {
        return _.filter(albums, args)
    }
    getAlbumById(_id) {
        const album = _.filter(albums, { _id })
        return album[0]
    }
    deleteAlbumById(_id) {
        return _.remove(albums, (album) => album._id == _id)
    }
}
module.exports = AlbumAPI