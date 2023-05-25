module.exports = {
    //Get all albums
    albums: (_parent, args, { dataSources }) => {
        return dataSources.AlbumAPI.getAlbums(args)
    },
    // Get single Album by ID
    albumById: (_parent, { _id }, { dataSources }) => {
        return dataSources.AlbumAPI.getAlbumById(_id)
    }
}
