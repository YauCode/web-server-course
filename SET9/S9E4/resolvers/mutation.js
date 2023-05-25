module.exports = {
    // Delete Album by ID
    deleteAlbum: (_parent, { _id }, { dataSources }) => {
        return dataSources.AlbumAPI.deleteAlbumById(_id)
    }
}
